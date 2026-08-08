import os
import time
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

from uazapi import send_text, send_presence, mark_read, download_media
from llm import generate_reply, transcribe_audio
import memory
from buffer import MessageBuffer

BUFFER_SECONDS = float(os.environ.get("BUFFER_SECONDS", 8))


def _load_system_prompt() -> str:
    override = os.environ.get("SYSTEM_PROMPT")
    if override:
        return override
    prompt_path = os.path.join(os.path.dirname(__file__), "system_prompt.txt")
    with open(prompt_path, encoding="utf-8") as f:
        return f.read()


SYSTEM_PROMPT = _load_system_prompt()

app = Flask(__name__)


MAX_MESSAGES = 2


def split_reply(text: str) -> list[str]:
    parts = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks = []
    for part in parts:
        if len(part) <= 800:
            chunks.append(part)
            continue
        buf = ""
        for sentence in part.split(". "):
            piece = sentence if sentence.endswith(".") else sentence + "."
            if buf and len(buf) + len(piece) > 800:
                chunks.append(buf.strip())
                buf = ""
            buf += piece + " "
        if buf.strip():
            chunks.append(buf.strip())
    chunks = [c for c in chunks if c]

    # Nunca mais que MAX_MESSAGES mensagens seguidas — várias mensagens em sequência
    # parecem automação. Junta o excedente na última mensagem em vez de descartar.
    if len(chunks) > MAX_MESSAGES:
        head, tail = chunks[:MAX_MESSAGES - 1], chunks[MAX_MESSAGES - 1:]
        chunks = head + ["\n\n".join(tail)]

    return chunks


def handle_flush(user: str, texts: list) -> None:
    send_presence(user, "composing")

    user_turn = "\n".join(texts)
    memory.append(user, "user", user_turn)

    reply = generate_reply(memory.get(user), SYSTEM_PROMPT, tools=None)
    memory.append(user, "model", reply)

    for chunk in split_reply(reply):
        send_presence(user, "composing")
        time.sleep(1 + len(chunk) / 200)
        send_text(user, chunk)

    send_presence(user, "paused")


buffer = MessageBuffer(BUFFER_SECONDS, on_flush=handle_flush)


@app.route("/", methods=["GET"])
def health():
    return "ok"


@app.route("/webhook", methods=["POST"])
def webhook():
    payload = request.get_json(silent=True) or {}
    if payload.get("event") != "message":
        return jsonify({"ok": True})

    data = payload.get("data", {})
    if data.get("fromMe") or data.get("isGroup"):
        return jsonify({"ok": True})

    msg_type = data.get("type")
    if msg_type not in ("text", "audio"):
        return jsonify({"ok": True})

    number = (data.get("from") or "").split("@")[0]
    message_id = data.get("id") or ""
    if not number:
        return jsonify({"ok": True})

    if msg_type == "audio":
        media = download_media(number, message_id)
        if not media or not media.get("base64"):
            return jsonify({"ok": True})
        body = transcribe_audio(media["base64"], media.get("mimeType") or "audio/ogg")
        if not body:
            return jsonify({"ok": True})
    else:
        body = data.get("body") or ""
        if not body:
            return jsonify({"ok": True})

    mark_read(number, message_id)
    buffer.add(number, body)
    return jsonify({"ok": True})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

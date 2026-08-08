import os
from google import genai
from google.genai import types

GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
_client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


def generate_reply(history: list[dict], system: str, tools: list | None = None) -> str:
    """Chama Gemini generate_content. tools=None hoje; preparado pra function calling depois."""
    config = types.GenerateContentConfig(
        system_instruction=system,
        max_output_tokens=1024,
        tools=tools,
    )
    try:
        response = _client.models.generate_content(
            model=GEMINI_MODEL,
            contents=history,
            config=config,
        )
    except Exception as e:
        print(f"[llm] erro: {e}")
        return "Desculpa, tive um probleminha aqui. Pode repetir?"

    # TODO: handle function_call parts quando tools for usado
    text = (response.text or "").strip()
    print(f"[llm] reply len={len(text)}")
    return text


def transcribe_audio(audio_b64: str, mime_type: str) -> str:
    """Transcreve áudio (base64) usando o Gemini nativamente multimodal. Sem fallback de STT separado."""
    config = types.GenerateContentConfig(
        system_instruction="Transcreva o áudio a seguir em português do Brasil. Responda apenas com o texto transcrito, sem comentários e sem aspas.",
        max_output_tokens=512,
    )
    try:
        response = _client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[{"role": "user", "parts": [{"inline_data": {"mime_type": mime_type, "data": audio_b64}}]}],
            config=config,
        )
    except Exception as e:
        print(f"[llm] erro transcrição: {e}")
        return ""
    return (response.text or "").strip()

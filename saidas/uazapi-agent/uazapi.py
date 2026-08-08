import os
import requests

BASE_URL = os.environ["UAZAPI_BASE_URL"].rstrip("/")
TOKEN = os.environ["UAZAPI_INSTANCE_TOKEN"]
HEADERS = {"token": TOKEN, "Content-Type": "application/json"}


def _request(method: str, path: str, body: dict) -> None:
    try:
        r = requests.request(method, f"{BASE_URL}{path}", headers=HEADERS, json=body, timeout=15)
        if not r.ok:
            print(f"[uazapi] {method} {path} -> {r.status_code}")
    except requests.RequestException as e:
        print(f"[uazapi] {method} {path} erro: {e}")


def send_text(number: str, text: str) -> None:
    _request("POST", "/send/text", {"number": number, "text": text})


def send_presence(number: str, presence: str) -> None:
    _request("POST", "/send/presence", {"number": number, "presence": presence})


def mark_read(number: str, message_id: str) -> None:
    _request("PUT", "/send/read", {"number": number, "messageId": message_id})


def download_media(number: str, message_id: str) -> dict | None:
    try:
        r = requests.post(
            f"{BASE_URL}/send/download-media",
            headers=HEADERS,
            json={"number": number, "messageId": message_id},
            timeout=30,
        )
        if not r.ok:
            print(f"[uazapi] download-media -> {r.status_code}")
            return None
        return r.json()
    except requests.RequestException as e:
        print(f"[uazapi] download-media erro: {e}")
        return None

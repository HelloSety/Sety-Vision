import json
import os
import threading

MAX_HISTORY = int(os.environ.get("MAX_HISTORY", 20))
_STORE_PATH = os.path.join(os.path.dirname(__file__), "conversations.json")

_lock = threading.Lock()
_history: dict[str, list[dict]] = {}


def _load() -> None:
    global _history
    if not os.path.exists(_STORE_PATH):
        return
    try:
        with open(_STORE_PATH, encoding="utf-8") as f:
            _history = json.load(f)
    except (json.JSONDecodeError, OSError) as e:
        print(f"[memory] falha ao carregar {_STORE_PATH}, iniciando vazio: {e}")
        _history = {}


def _save() -> None:
    tmp_path = _STORE_PATH + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(_history, f, ensure_ascii=False)
    os.replace(tmp_path, _STORE_PATH)


_load()


def append(user: str, role: str, text: str) -> None:
    with _lock:
        msgs = _history.setdefault(user, [])
        msgs.append({"role": role, "parts": [{"text": text}]})
        del msgs[:-MAX_HISTORY]
        _save()


def get(user: str) -> list[dict]:
    with _lock:
        return list(_history.get(user, []))


def reset(user: str) -> None:
    with _lock:
        _history.pop(user, None)
        _save()

import threading
from typing import Callable


class MessageBuffer:
    def __init__(self, wait_seconds: float, on_flush: Callable[[str, list], None]):
        self.wait_seconds = wait_seconds
        self.on_flush = on_flush
        self._lock = threading.Lock()
        self._pending: dict[str, list] = {}
        self._timers: dict[str, threading.Timer] = {}

    def add(self, user: str, text: str) -> None:
        with self._lock:
            self._pending.setdefault(user, []).append(text)
            old_timer = self._timers.get(user)
            if old_timer:
                old_timer.cancel()
            timer = threading.Timer(self.wait_seconds, self._flush, [user])
            timer.daemon = True
            self._timers[user] = timer
            timer.start()

    def _flush(self, user: str) -> None:
        with self._lock:
            texts = self._pending.pop(user, [])
            self._timers.pop(user, None)
        if not texts:
            return
        print(f"[buffer] flush user={user} msgs={len(texts)}")
        try:
            self.on_flush(user, texts)
        except Exception as e:
            # Nunca deixar a conversa travada em silêncio: loga e avisa o cliente
            # em vez de simplesmente sumir (essa era a causa do "parou do nada").
            print(f"[buffer] ERRO ao processar user={user}: {e}")
            self._safe_fallback(user)

    def _safe_fallback(self, user: str) -> None:
        try:
            from uazapi import send_text
            send_text(user, "Opa, tive uma instabilidade aqui agora. Pode repetir sua última mensagem? 🙏")
        except Exception as e:
            print(f"[buffer] falha até no fallback user={user}: {e}")

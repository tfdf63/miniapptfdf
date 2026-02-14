# miniapptfdf

Mini App для tfdf.ru (Vite + React).

## Деплой (GitHub Actions)

Секрет **BEGET_SSH_KEY** должен содержать приватный SSH-ключ **в base64** (одна строка), иначе на раннере будет `Load key: error in libcrypto`.

На ПК выполни и скопируй вывод целиком:
```bash
cat ~/.ssh/id_ed25519 | base64 | tr -d '\n'
```
Вставь в GitHub: Settings → Secrets → BEGET_SSH_KEY.

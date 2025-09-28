# ⚡ Быстрый деплой на Netlify

## 🚀 Шаги для деплоя:

### 1. Подготовьте Git репозиторий
```bash
git init
git add .
git commit -m "Ready for Netlify deployment"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Зайдите на [netlify.com](https://netlify.com)
- Нажмите **"New site from Git"**
- Выберите ваш репозиторий
- Настройки билда:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
  - **Functions directory:** `netlify/functions`

### 3. Добавьте переменные окружения
В `Site settings` → `Environment variables`:

```
MONGODB_URI = mongodb+srv://almazburgij_db_user:almazburgij_db_user@almazbase.ni6fyef.mongodb.net/almazbur?retryWrites=true&w=majority
TELEGRAM_BOT_TOKEN = 8289279722:AAExM8lq6D8UXlynpFai_V7EaOrhyijrlcA
MAIN_ADMIN_IDS = 7228386197,1757465395
```

### 4. Деплойте!
Нажмите **"Deploy site"**

## ✅ Проверьте работу:
- Откройте ваш сайт
- Протестируйте форму заказа
- Проверьте уведомления в Telegram

---

**📖 Подробные инструкции:** См. `NETLIFY_DEPLOYMENT.md`
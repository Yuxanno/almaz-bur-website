# ✅ Чеклист для деплоя на Netlify

## Подготовка завершена ✅

- [x] **Конфигурация API** - настроена для Netlify Functions
- [x] **netlify.toml** - настроен правильно
- [x] **Netlify Functions** - orders.js готов к деплою
- [x] **Зависимости** - обновлены до актуальных версий
- [x] **Переменные окружения** - .env.example создан
- [x] **Проект собирается** - npm run build работает
- [x] **Документация** - инструкции по деплою готовы

## Что нужно сделать для деплоя:

### 1. Git репозиторий 📁
```bash
git init
git add .
git commit -m "Ready for Netlify deployment"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Netlify настройка 🌐
- Зайти на [netlify.com](https://netlify.com)
- New site from Git
- Выбрать репозиторий
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`

### 3. Environment Variables 🔐
Добавить в Netlify Dashboard:
```
MONGODB_URI = mongodb+srv://almazburgij_db_user:almazburgij_db_user@almazbase.ni6fyef.mongodb.net/almazbur?retryWrites=true&w=majority
TELEGRAM_BOT_TOKEN = 8289279722:AAExM8lq6D8UXlynpFai_V7EaOrhyijrlcA
MAIN_ADMIN_IDS = 7228386197,1757465395
```

### 4. Deploy! 🚀
Нажать "Deploy site"

## После деплоя - проверить:

- [ ] Сайт загружается
- [ ] Форма заказа работает
- [ ] API эндпоинт доступен: `/.netlify/functions/orders`
- [ ] Telegram уведомления приходят
- [ ] Все страницы доступны

## 📁 Файлы проекта:

- `QUICK_DEPLOY.md` - быстрая инструкция
- `NETLIFY_DEPLOYMENT.md` - подробная инструкция  
- `.env.example` - пример переменных окружения
- `netlify.toml` - конфигурация Netlify
- `netlify/functions/orders.js` - API функция

---

**🎉 Проект готов к деплою на Netlify!**
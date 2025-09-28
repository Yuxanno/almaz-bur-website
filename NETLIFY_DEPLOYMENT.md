# 🚀 Инструкция по деплою на Netlify

## 📋 Подготовка к деплою

### 1. Проверка конфигурации
Убедитесь, что у вас есть следующие файлы:
- ✅ `netlify.toml` - конфигурация Netlify
- ✅ `netlify/functions/orders.js` - серверная функция
- ✅ `netlify/functions/package.json` - зависимости для функций
- ✅ `.env.example` - пример переменных окружения

### 2. Подготовка репозитория Git
```bash
# Инициализируем Git репозиторий (если не сделано)
git init

# Добавляем все файлы
git add .

# Коммитим изменения
git commit -m "Initial commit for Netlify deployment"

# Добавляем удаленный репозиторий (замените URL на ваш)
git remote add origin https://github.com/yourusername/yourrepo.git

# Пушим в репозиторий
git push -u origin main
```

## 🌐 Деплой на Netlify

### Способ 1: Через Netlify Dashboard (Рекомендуется)

1. **Зайдите на [netlify.com](https://netlify.com) и авторизуйтесь**

2. **Нажмите "New site from Git"**

3. **Выберите провайдера Git** (GitHub, GitLab, Bitbucket)

4. **Выберите ваш репозиторий**

5. **Настройте параметры деплоя:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

6. **Настройте переменные окружения:**
   
   Перейдите в `Site settings` → `Environment variables` и добавьте:
   ```
   MONGODB_URI = mongodb+srv://almazburgij_db_user:almazburgij_db_user@almazbase.ni6fyef.mongodb.net/almazbur?retryWrites=true&w=majority
   TELEGRAM_BOT_TOKEN = 8289279722:AAExM8lq6D8UXlynpFai_V7EaOrhyijrlcA
   MAIN_ADMIN_IDS = 7228386197,1757465395
   ```

7. **Нажмите "Deploy site"**

### Способ 2: Через Netlify CLI

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Авторизуйтесь
netlify login

# Инициализируйте проект
netlify init

# Деплойте
netlify deploy --prod
```

## 🔧 Настройка переменных окружения

### В Netlify Dashboard:
1. Зайдите в ваш сайт на Netlify
2. Перейдите в `Site settings` → `Environment variables`
3. Нажмите `Add variable` для каждой переменной:

| Переменная | Значение |
|------------|----------|
| `MONGODB_URI` | `mongodb+srv://almazburgij_db_user:almazburgij_db_user@almazbase.ni6fyef.mongodb.net/almazbur?retryWrites=true&w=majority` |
| `TELEGRAM_BOT_TOKEN` | `8289279722:AAExM8lq6D8UXlynpFai_V7EaOrhyijrlcA` |
| `MAIN_ADMIN_IDS` | `7228386197,1757465395` |

## 🧪 Проверка деплоя

После успешного деплоя проверьте:

1. **Фронтенд:** Откройте ваш сайт и убедитесь, что он загружается
2. **API:** Проверьте эндпоинт здоровья: `https://yoursite.netlify.app/.netlify/functions/orders`
3. **Форма заказа:** Попробуйте отправить тестовый заказ
4. **Telegram уведомления:** Проверьте, приходят ли уведомления в Telegram

## 🔍 Отладка проблем

### Логи функций
```bash
# Просмотр логов через CLI
netlify functions:log orders

# Или в Dashboard: Functions → View logs
```

### Частые проблемы:

1. **Функция не работает:**
   - Проверьте логи функций в Netlify Dashboard
   - Убедитесь, что переменные окружения установлены
   - Проверьте синтаксис в `orders.js`

2. **База данных не подключается:**
   - Проверьте правильность `MONGODB_URI`
   - Убедитесь, что IP адрес Netlify разрешен в MongoDB Atlas

3. **Telegram бот не отправляет сообщения:**
   - Проверьте `TELEGRAM_BOT_TOKEN`
   - Убедитесь, что `MAIN_ADMIN_IDS` корректные

## 🔄 Автоматические деплои

После настройки, Netlify будет автоматически деплоить изменения при каждом push в основную ветку репозитория.

## 📝 Полезные команды

```bash
# Локальная разработка с Netlify Functions
netlify dev

# Тестирование функций локально
netlify functions:serve

# Просмотр статуса деплоя
netlify status

# Просмотр логов
netlify logs
```

## 🎉 Готово!

Ваш сайт теперь задеплоен на Netlify с полнофункциональным бэкендом и Telegram интеграцией!

URL вашего сайта будет выглядеть как: `https://yoursite.netlify.app`

---

**💡 Совет:** Добавьте кастомный домен в настройках Netlify для более профессионального вида.
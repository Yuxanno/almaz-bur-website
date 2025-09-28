# Деплой приложения Almaz Bur

## Сборка проекта

Для создания production-версии приложения выполните команду:

```bash
npm run build
```

Это создаст папку `dist` со всеми необходимыми файлами для деплоя.

## Локальное тестирование

Для тестирования production-версии локально выполните:

```bash
npm run preview
```

После этого приложение будет доступно по адресу: http://localhost:4173/

## Подготовка к деплою на Netlify (одной командой)

Для подготовки проекта к деплою на Netlify выполните одну команду:

```bash
npm run prepare-netlify
```

Эта команда:

1. Создаст production сборку
2. Сгенерирует sitemap.xml
3. Скопирует все необходимые файлы в папку `dist`
4. Подготовит Netlify Functions
5. Скопирует environment файлы

Готовый для деплоя проект будет находиться в папке `dist`.

## Деплой на сервер

### Вариант 1: Netlify (рекомендуется)

1. Зарегистрируйтесь на [Netlify](https://netlify.com)
2. Подключите ваш GitHub репозиторий или загрузите папку `dist` через интерфейс Netlify
3. В настройках "Build & deploy" установите:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. В настройках "Environment variables" добавьте:
   - `VITE_API_URL` = `https://almazbur.netlify.app`
   - `MONGODB_URI` = ваша строка подключения MongoDB
   - `TELEGRAM_BOT_TOKEN` = токен вашего Telegram бота
   - `MAIN_ADMIN_IDS` = список ID администраторов через запятую (например: `7228386197,1757465395`)
5. Деплой будет выполнен автоматически

После деплоя API будет доступен по адресу:

- Создание заказа: `POST https://almazbur.netlify.app/api/orders`
- Проверка состояния: `GET https://almazbur.netlify.app/health`

### Вариант 2: Node.js сервер (для бэкенда)

1. Загрузите весь проект на сервер
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` с необходимыми переменными окружения:
   ```
   MONGODB_URI=your_mongodb_connection_string
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   MAIN_ADMIN_IDS=admin_id1,admin_id2
   PORT=5000
   ```
4. Запустите сервер:
   ```bash
   npm run server
   ```

### Вариант 3: Docker (рекомендуется)

1. Создайте Dockerfile в корне проекта:

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .

   RUN npm run build

   EXPOSE 5000

   CMD ["npm", "run", "server"]
   ```

2. Создайте docker-compose.yml:

   ```yaml
   version: "3.8"

   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=${MONGODB_URI}
         - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
         - MAIN_ADMIN_IDS=${MAIN_ADMIN_IDS}
         - PORT=5000
       env_file:
         - .env
   ```

3. Соберите и запустите контейнер:
   ```bash
   docker-compose up -d
   ```

## Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```
# Для фронтенда (Vite) - должен начинаться с VITE_
VITE_API_URL=https://ваш-домен.com

# Для бэкенда
MONGODB_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
MAIN_ADMIN_IDS=admin_id1,admin_id2
PORT=5000
```

## Настройка для различных платформ

### Netlify

1. В настройках сайта перейдите к "Environment variables"
2. Добавьте переменные:
   - Key: `VITE_API_URL`
   - Value: `https://almazbur.netlify.app`
   - Key: `MONGODB_URI`
   - Value: ваша строка подключения MongoDB
   - Key: `TELEGRAM_BOT_TOKEN`
   - Value: токен вашего Telegram бота
   - Key: `MAIN_ADMIN_IDS`
   - Value: список ID администраторов через запятую

### Vercel

1. В настройках проекта перейдите к "Environment Variables"
2. Добавьте переменную:
   - Key: `VITE_API_URL`
   - Value: `https://ваш-бэкенд-домен.com`

### GitHub Pages

Для GitHub Pages переменные окружения нужно задавать во время сборки:

1. Создайте файл `.env.production` в корне проекта
2. Добавьте в него:
   ```
   VITE_API_URL=https://ваш-бэкенд-домен.com
   ```
3. Выполните сборку:
   ```bash
   npm run build
   ```

## API Эндпоинты

- `POST /api/orders` - Создание нового заказа
- `GET /health` - Проверка состояния сервера

## Функционал Telegram бота

1. Уведомления администраторов о новых заказах
2. Возможность удаления заказов через кнопку "❌ O'chirish" в Telegram

## Требования к серверу

- Node.js версии 16 или выше
- Доступ к MongoDB
- Открытые порты (по умолчанию 5000 для сервера, 4173 для preview)

## Рекомендации по безопасности

1. Используйте HTTPS в production
2. Не храните чувствительные данные в коде
3. Регулярно обновляйте зависимости
4. Настройте правильные CORS-заголовки

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

## Деплой на сервер

### Вариант 1: Статический хостинг (Vercel, Netlify, GitHub Pages)

1. Загрузите содержимое папки `dist` на ваш хостинг
2. Убедитесь, что настроен редирект всех запросов на `index.html` (SPA routing)
3. Настройте переменные окружения:
   - `VITE_API_URL` - URL вашего бэкенда (например, https://ваш-бэкенд.com)

### Вариант 2: Node.js сервер

1. Загрузите весь проект на сервер
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` с необходимыми переменными окружения:
   ```
   VITE_API_URL=https://ваш-бэкенд.com
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
         - VITE_API_URL=https://ваш-бэкенд.com
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
# Для фронтенда (Vite)
VITE_API_URL=https://ваш-бэкенд.com

# Для бэкенда
MONGODB_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
MAIN_ADMIN_IDS=admin_id1,admin_id2
PORT=5000
```

## Настройка для различных платформ

### Netlify

1. В настройках сайта перейдите к "Environment variables"
2. Добавьте переменную:
   - Key: `VITE_API_URL`
   - Value: `https://ваш-бэкенд-домен.com`

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

## Требования к серверу

- Node.js версии 16 или выше
- Доступ к MongoDB
- Открытые порты (по умолчанию 5000 для сервера, 4173 для preview)

## Рекомендации по безопасности

1. Используйте HTTPS в production
2. Не храните чувствительные данные в коде
3. Регулярно обновляйте зависимости
4. Настройте правильные CORS-заголовки

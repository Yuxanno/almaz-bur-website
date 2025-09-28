# Almaz Bur Website

Добро пожаловать в репозиторий веб-сайта компании Almaz Bur! Это современный веб-сайт, созданный с использованием React, Vite и Tailwind CSS.

## О проекте

Этот проект представляет собой полнофункциональный веб-сайт для компании Almaz Bur, предоставляющей услуги по бурению скважин. Сайт включает в себя:

- Адаптивный дизайн для всех устройств
- Современный пользовательский интерфейс
- Форму заказа с интеграцией Telegram
- Поддержку многоязычности
- SEO-оптимизацию

## Технологии

- **Frontend**: React 18, Vite, Tailwind CSS
- **UI Components**: Radix UI, Lucide React Icons
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Netlify (рекомендуется)
- **Telegram Integration**: node-telegram-bot-api

## Начало работы

### Предварительные требования

- Node.js (версия 16 или выше)
- npm или yarn
- MongoDB Atlas account (для production)

### Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <repository-url>
   ```

2. Перейдите в директорию проекта:

   ```bash
   cd almaz-bur-website
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

### 1. Переменные окружения:

Создайте файл `.env` в корне проекта со следующими переменными:

```
VITE_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
MAIN_ADMIN_IDS=admin_id1,admin_id2
PORT=5000
```

### 2. Запуск в режиме разработки

```bash
# Запуск фронтенда и бэкенда одновременно
npm run dev

# Или отдельно:
npm run client  # Фронтенд на http://localhost:3000
npm run server  # Бэкенд на http://localhost:5000
```

### 3. Сборка для production

```bash
# Сборка фронтенда
npm run build

# Запуск production сервера
npm run production
```

### 4. Подготовка к деплою на Netlify (одной командой)

```bash
npm run prepare-netlify
```

Эта команда создаст готовую к деплою версию сайта в папке `dist` со всеми необходимыми файлами.

## Деплой

Подробные инструкции по деплою находятся в файле [DEPLOYMENT.md](DEPLOYMENT.md).

## API Эндпоинты

- `POST /api/orders` - Создание нового заказа
- `GET /health` - Проверка состояния сервера

## Функционал Telegram бота

1. Уведомления администраторов о новых заказах

## Структура проекта

```
src/
├── components/     # React компоненты
├── constants/      # Константы и данные
├── hooks/          # Пользовательские хуки
├── lib/            # Вспомогательные библиотеки
├── locales/        # Файлы локализации
├── utils/          # Утилиты и вспомогательные функции
├── App.jsx         # Главный компонент приложения
└── main.jsx        # Точка входа
```

## Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для production
- `npm run preview` - Предпросмотр production сборки
- `npm run prepare-netlify` - Подготовка к деплою на Netlify
- `npm run sitemap` - Генерация sitemap.xml

## Лицензия

Этот проект лицензирован по лицензии MIT - см. файл [LICENSE](LICENSE) для подробностей.

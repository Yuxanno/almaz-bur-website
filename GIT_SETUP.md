# 🔧 Git Setup для Almaz Bur

## ✅ .gitignore настроен

### 🚫 **Что игнорируется:**

#### **Зависимости:**
- `node_modules/` - пакеты npm
- `package-lock.json` - локальные блокировки
- `yarn.lock` - блокировки yarn

#### **Сборка:**
- `dist/` - собранные файлы
- `build/` - файлы сборки
- `.next/` - Next.js файлы

#### **Переменные окружения:**
- `.env` - локальные переменные
- `.env.local` - локальные настройки
- `.env.production` - продакшен настройки

#### **IDE файлы:**
- `.vscode/` - настройки VS Code

- `.idea/` - настройки IntelliJ
- `*.swp` - временные файлы

#### **Системные файлы:**
- `.DS_Store` - macOS
- `Thumbs.db` - Windows
- `*.log` - логи

### ✅ **Что НЕ игнорируется (важные файлы):**

- `src/` - исходный код
- `public/` - статические файлы
- `netlify/` - Netlify функции
- `package.json` - зависимости
- `vite.config.js` - конфигурация
- `netlify.toml` - настройки Netlify
- `README.md` - документация
- `DEPLOYMENT_GUIDE.md` - инструкция

## 🚀 **Команды Git:**

### **Первый коммит:**
```bash
git add .
git commit -m "Initial commit: Almaz Bur website with SEO optimization"
git push origin main
```

### **Обычные коммиты:**
```bash
git add .
git commit -m "Update: описание изменений"
git push origin main
```

### **Проверка статуса:**
```bash
git status
git status --ignored
```

## 📋 **Перед коммитом проверьте:**

- [ ] `.env` файл не добавлен в git
- [ ] `node_modules/` игнорируется
- [ ] `dist/` игнорируется
- [ ] Все важные файлы добавлены

## ⚠️ **КРИТИЧЕСКИ ВАЖНО - БЕЗОПАСНОСТЬ:**

### 🚨 **НИКОГДА НЕ добавляйте в git:**
- **`.env` файлы** - содержат секретные данные!
- **`.env.development`** - локальные настройки
- **`.env.production`** - продакшен секреты
- **`.env.netlify`** - настройки Netlify
- **`node_modules/`** - слишком большой
- **`dist/`** - генерируется автоматически

### ✅ **Добавляйте в git:**
- Исходный код в `src/`
- Конфигурационные файлы
- Документацию
- Netlify функции
- **`env.example`** - пример переменных

### 🔒 **Если случайно добавили секреты:**

1. **Удалите из git:**
   ```bash
   git rm --cached .env
   git commit -m "SECURITY: Remove .env from repository"
   git push origin main
   ```

2. **Смените все пароли и токены!**
3. **Обновите .gitignore**

### 📋 **Проверка безопасности:**
```bash
# Проверьте, что секреты не в git
git ls-files | grep -E "\.env"

# Должно быть пусто!
```

---

**Git настроен безопасно! 🔒**

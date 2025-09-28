import { execSync } from "child_process";
import { existsSync, copyFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Получаем __dirname в ES модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🚀 Подготовка проекта к деплою на Netlify...");

try {
  // 1. Создание production сборки
  console.log("🏗️ Создание production сборки...");
  execSync("npm run build", { stdio: "inherit" });

  // 2. Копирование .env файлов если они еще не скопированы
  console.log("📋 Подготовка environment файлов...");

  // Копируем .env в dist для Netlify
  const envFiles = [
    ".env",
    ".env.development",
    ".env.production",
    ".env.netlify",
  ];
  envFiles.forEach((file) => {
    const srcPath = join(__dirname, "..", file);
    const destPath = join(__dirname, "..", "dist", file);

    if (existsSync(srcPath)) {
      copyFileSync(srcPath, destPath);
      console.log(`✅ Скопирован ${file}`);
    }
  });

  // 3. Копирование netlify.toml в dist
  const netlifyConfig = join(__dirname, "..", "netlify.toml");
  const distNetlifyConfig = join(__dirname, "..", "dist", "netlify.toml");

  if (existsSync(netlifyConfig)) {
    copyFileSync(netlifyConfig, distNetlifyConfig);
    console.log("✅ Скопирован netlify.toml");
  }

  // 4. Копирование функций Netlify
  const functionsDir = join(__dirname, "..", "netlify", "functions");
  const distFunctionsDir = join(
    __dirname,
    "..",
    "dist",
    "netlify",
    "functions"
  );

  if (existsSync(functionsDir)) {
    // Создаем директорию если она не существует
    if (!existsSync(join(__dirname, "..", "dist", "netlify"))) {
      mkdirSync(join(__dirname, "..", "dist", "netlify"));
    }

    if (!existsSync(distFunctionsDir)) {
      mkdirSync(distFunctionsDir, { recursive: true });
    }

    // Копируем все файлы функций
    const functionFiles = readdirSync(functionsDir);
    functionFiles.forEach((file) => {
      const srcPath = join(functionsDir, file);
      const destPath = join(distFunctionsDir, file);
      copyFileSync(srcPath, destPath);
      console.log(`✅ Скопирована функция ${file}`);
    });

    // Копируем package.json для функций
    const functionsPackage = join(functionsDir, "package.json");
    const distFunctionsPackage = join(distFunctionsDir, "package.json");

    if (existsSync(functionsPackage)) {
      copyFileSync(functionsPackage, distFunctionsPackage);
      console.log("✅ Скопирован package.json для функций");
    }
  }

  console.log("✅ Подготовка к деплою на Netlify завершена!");
  console.log('📁 Готовый для деплоя проект находится в папке "dist"');
  console.log(
    "📝 Не забудьте установить переменные окружения в настройках Netlify:"
  );
  console.log("   - MONGODB_URI");
  console.log("   - TELEGRAM_BOT_TOKEN");
  console.log("   - MAIN_ADMIN_IDS");
  console.log("   - VITE_API_URL");
} catch (error) {
  console.error("❌ Ошибка при подготовке к деплою:", error.message);
  process.exit(1);
}

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import dns from "dns";

// 🔹 заставляем Node использовать IPv4 (фикс ошибки ENOTFOUND)
dns.setDefaultResultOrder("ipv4first");

// Настройка __dirname для ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "dist")));

// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  service: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Telegram bot (polling)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// POST /api/orders
app.post("/api/orders", async (req, res) => {
  try {
    const { name, phone, address, service, description } = req.body;

    if (!name || !phone || !service) {
      return res
        .status(400)
        .json({ success: false, message: "Majburiy maydonlar to'ldirilmagan" });
    }

    const newOrder = new Order({ name, phone, address, service, description });
    await newOrder.save();

    // Send to Telegram
    const admins = process.env.MAIN_ADMIN_IDS.split(",");
    const messageText = `📩 Yangi buyurtma:\n👤 Ism: ${name}\n📞 Telefon: ${phone}\n📍 Manzil: ${
      address || "-"
    }\n🛠 Xizmat: ${service}\n📝 Tavsif: ${description || "-"}`;

    for (const adminId of admins) {
      await bot.sendMessage(adminId.trim(), messageText, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "❌ O'chirish",
                callback_data: `delete_${newOrder._id}`,
              },
            ],
          ],
        },
      });
    }

    res.json({
      success: true,
      message: "Buyurtma saqlandi va Telegramga yuborildi",
    });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
});

// Handle Telegram button clicks
bot.on("callback_query", async (query) => {
  const orderId = query.data.replace("delete_", "");
  try {
    await Order.findByIdAndDelete(orderId);

    await bot.editMessageText("✅ Buyurtma o'chirildi", {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
    });

    await bot.answerCallbackQuery(query.id, { text: "Buyurtma o'chirildi" });
  } catch (err) {
    console.error("❌ Telegram delete error:", err);
    await bot.answerCallbackQuery(query.id, { text: "Xatolik yuz berdi" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Catch all handler: Send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

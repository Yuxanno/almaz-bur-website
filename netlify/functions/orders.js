// Netlify function to handle orders API
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");

// MongoDB connection
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Order schema
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  service: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// Telegram bot initialization
let bot;
const initBot = () => {
  if (!bot) {
    bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
  }
  return bot;
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Connect to database
    await connectToDatabase();

    // Initialize bot
    const bot = initBot();

    if (event.httpMethod === "POST") {
      // Parse request body
      const { name, phone, address, service, description } = JSON.parse(
        event.body
      );

      // Validate required fields
      if (!name || !phone || !service) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: "Majburiy maydonlar to'ldirilmagan",
          }),
        };
      }

      // Save order to database
      const newOrder = new Order({
        name,
        phone,
        address,
        service,
        description,
      });
      await newOrder.save();

      // Send notification to Telegram
      if (process.env.MAIN_ADMIN_IDS) {
        const admins = process.env.MAIN_ADMIN_IDS.split(",");
        const messageText = `📩 Yangi buyurtma:\n👤 Ism: ${name}\n📞 Telefon: ${phone}\n📍 Manzil: ${
          address || "-"
        }\n🛠 Xizmat: ${service}\n📝 Tavsif: ${description || "-"}`;

        for (const adminId of admins) {
          try {
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
          } catch (error) {
            console.error("Error sending Telegram message:", error);
          }
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Buyurtma saqlandi va Telegramga yuborildi",
        }),
      };
    } else if (event.httpMethod === "GET") {
      // Health check endpoint
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "OK",
          db:
            mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
        }),
      };
    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Method not allowed",
        }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Server xatosi",
      }),
    };
  }
};

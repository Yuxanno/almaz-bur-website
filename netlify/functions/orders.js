// Netlify function to handle orders API
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");

// MongoDB connection with caching
let cachedDb = null;

const connectDB = async () => {
  // Return cached connection if available
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    console.log("Connecting to MongoDB...");

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    cachedDb = mongoose.connection;
    console.log("MongoDB connected successfully");
    return cachedDb;
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

// Use existing model or create new one
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

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
    await connectDB();

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
      const savedOrder = await newOrder.save();

      // Send notification to Telegram admins
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.MAIN_ADMIN_IDS) {
        const admins = process.env.MAIN_ADMIN_IDS.split(",");
        const messageText = `📝 Yangi buyurtma:

Ism: ${name}
Telefon: ${phone}
Manzil: ${address || "Ko'rsatilmagan"}
Xizmat: ${service}
Tavsif: ${description || "Ko'rsatilmagan"}
Yaratilgan vaqt: ${new Date().toLocaleString("uz-UZ")}`;

        // Initialize bot for sending message
        const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
          polling: false,
        });

        for (const adminId of admins) {
          try {
            const sentMessage = await bot.sendMessage(
              adminId.trim(),
              messageText,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "❌ O'chirish",
                        callback_data: `delete_order_${savedOrder._id}`,
                      },
                    ],
                  ],
                },
              }
            );
            console.log(
              `Successfully sent order notification to admin ${adminId.trim()}`
            );
            console.log(`Callback data sent: delete_order_${savedOrder._id}`);
            console.log(
              `Sent message details:`,
              JSON.stringify(sentMessage, null, 2)
            );
          } catch (error) {
            console.error(`Failed to send message to admin ${adminId}:`, error);
          }
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Buyurtma saqlandi",
          orderId: savedOrder._id,
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

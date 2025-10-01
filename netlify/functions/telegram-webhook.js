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

// Forum Post schema (need to match the one in forum-post.js)
const forumPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Order schema (need to match the one in orders.js)
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  service: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Use existing models or create new ones
const ForumPost =
  mongoose.models.ForumPost || mongoose.model("ForumPost", forumPostSchema);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

    // Parse the Telegram update
    const update = JSON.parse(event.body);
    console.log("Received Telegram update:", JSON.stringify(update, null, 2));

    // Handle callback queries
    if (update.callback_query) {
      const query = update.callback_query;
      const data = query.data;
      const chatId = query.message.chat.id;

      console.log("Received callback query:", JSON.stringify(query, null, 2));

      // Check if user is authorized
      const allowedAdmins = process.env.MAIN_ADMIN_IDS
        ? process.env.MAIN_ADMIN_IDS.split(",")
        : [];

      if (!allowedAdmins.includes(chatId.toString())) {
        console.log("Unauthorized callback query from chat ID:", chatId);
        // Initialize bot for responses
        const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
          polling: false,
        });

        await bot.answerCallbackQuery(query.id, {
          text: "Sizga bu amalga ruxsat berilmagan",
        });

        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({
            success: false,
            error: "Unauthorized",
          }),
        };
      }

      // Initialize bot for responses
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: false,
      });

      // Handle delete requests for forum posts
      if (data.startsWith("delete_forum_")) {
        // Extract postId from callback data
        const postId = data.substring(13); // Remove "delete_forum_" prefix
        console.log("Processing delete request for forum post ID:", postId);

        try {
          // Validate ObjectId format
          if (!mongoose.Types.ObjectId.isValid(postId)) {
            console.error("Invalid forum post ID format:", postId);
            await bot.answerCallbackQuery(query.id, {
              text: "Forum post topilmadi",
            });
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                success: false,
                error: "Invalid forum post ID format",
              }),
            };
          }

          // Find and delete the forum post
          const deletedPost = await ForumPost.findByIdAndDelete(postId);

          if (!deletedPost) {
            console.log("Forum post not found with ID:", postId);
            // Edit message to show "not found" message
            await bot.editMessageText("❌ Forum post topilmadi", {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
            });
            await bot.answerCallbackQuery(query.id, {
              text: "Forum post topilmadi",
            });
          } else {
            console.log("Forum post deleted successfully:", postId);
            // Edit message to show confirmation
            await bot.editMessageText("✅ Forum post o‘chirildi", {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
            });
            await bot.answerCallbackQuery(query.id, {
              text: "Forum post o‘chirildi",
            });
          }
        } catch (error) {
          console.error("Error deleting forum post:", error);
          await bot.answerCallbackQuery(query.id, {
            text: "Xatolik yuz berdi",
          });
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Failed to delete forum post",
              message: error.message,
            }),
          };
        }
      }
      // Handle delete requests for orders
      else if (data.startsWith("delete_order_")) {
        // Extract orderId from callback data
        const orderId = data.substring(13); // Remove "delete_order_" prefix
        console.log("Processing delete request for order ID:", orderId);

        try {
          // Validate ObjectId format
          if (!mongoose.Types.ObjectId.isValid(orderId)) {
            console.error("Invalid order ID format:", orderId);
            await bot.answerCallbackQuery(query.id, {
              text: "Buyurtma topilmadi",
            });
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                success: false,
                error: "Invalid order ID format",
              }),
            };
          }

          // Ask for confirmation
          console.log("Asking for confirmation to delete order:", orderId);
          await bot.editMessageText(query.message.text, {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "✅ Ha",
                    callback_data: `confirm_delete_order_${orderId}`,
                  },
                  {
                    text: "❌ Yo'q",
                    callback_data: `cancel_delete_order_${orderId}`,
                  },
                ],
              ],
            },
          });

          await bot.answerCallbackQuery(query.id, {
            text: "O'chirishni tasdiqlaysizmi?",
          });
        } catch (error) {
          console.error("Error processing order delete request:", error);
          await bot.answerCallbackQuery(query.id, {
            text: "Xatolik yuz berdi",
          });
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Failed to process order delete request",
              message: error.message,
            }),
          };
        }
      }
      // Handle confirmation of order deletion
      else if (data.startsWith("confirm_delete_order_")) {
        // Extract orderId from callback data
        const orderId = data.substring(21); // Remove "confirm_delete_order_" prefix
        console.log("Confirming delete request for order ID:", orderId);

        try {
          // Validate ObjectId format
          if (!mongoose.Types.ObjectId.isValid(orderId)) {
            console.error("Invalid order ID format:", orderId);
            await bot.answerCallbackQuery(query.id, {
              text: "Buyurtma topilmadi",
            });
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({
                success: false,
                error: "Invalid order ID format",
              }),
            };
          }

          // Find and delete the order
          const deletedOrder = await Order.findByIdAndDelete(orderId);

          if (!deletedOrder) {
            console.log("Order not found with ID:", orderId);
            // Edit message to show "not found" message
            await bot.editMessageText("❌ Buyurtma topilmadi", {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
            });
            await bot.answerCallbackQuery(query.id, {
              text: "Buyurtma topilmadi",
            });
          } else {
            console.log("Order deleted successfully:", orderId);
            // Edit message to show confirmation
            await bot.editMessageText("✅ Buyurtma o‘chirildi", {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
            });
            await bot.answerCallbackQuery(query.id, {
              text: "Buyurtma o‘chirildi",
            });
          }
        } catch (error) {
          console.error("Error deleting order:", error);
          await bot.answerCallbackQuery(query.id, {
            text: "Xatolik yuz berdi",
          });
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Failed to delete order",
              message: error.message,
            }),
          };
        }
      }
      // Handle cancellation of order deletion
      else if (data.startsWith("cancel_delete_order_")) {
        // Extract orderId from callback data
        const orderId = data.substring(20); // Remove "cancel_delete_order_" prefix
        console.log("Cancelling delete request for order ID:", orderId);

        try {
          // Restore original message with delete button
          const order = await Order.findById(orderId);
          if (order) {
            const messageText = `📝 Yangi buyurtma:

Ism: ${order.name}
Telefon: ${order.phone}
Manzil: ${order.address || "Ko'rsatilmagan"}
Xizmat: ${order.service}
Tavsif: ${order.description || "Ko'rsatilmagan"}
Yaratilgan vaqt: ${new Date(order.createdAt).toLocaleString("uz-UZ")}`;

            await bot.editMessageText(messageText, {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "❌ O'chirish",
                      callback_data: `delete_order_${orderId}`,
                    },
                  ],
                ],
              },
            });

            await bot.answerCallbackQuery(query.id, {
              text: "O'chirish bekor qilindi",
            });
          } else {
            await bot.editMessageText("❌ Buyurtma topilmadi", {
              chat_id: query.message.chat.id,
              message_id: query.message.message_id,
            });
            await bot.answerCallbackQuery(query.id, {
              text: "Buyurtma topilmadi",
            });
          }
        } catch (error) {
          console.error("Error cancelling order delete request:", error);
          await bot.answerCallbackQuery(query.id, {
            text: "Xatolik yuz berdi",
          });
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: "Failed to cancel order delete request",
              message: error.message,
            }),
          };
        }
      }
      // Handle unknown callbacks
      else {
        console.log("Unknown callback data:", data);
        await bot.answerCallbackQuery(query.id, { text: "Noma'lum buyruq" });
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    // Handle regular messages
    if (update.message) {
      const chatId = update.message.chat.id;
      const messageText = update.message.text;

      // Check if user is authorized
      const allowedAdmins = process.env.MAIN_ADMIN_IDS
        ? process.env.MAIN_ADMIN_IDS.split(",")
        : [];

      if (!allowedAdmins.includes(chatId.toString())) {
        // Initialize bot for responses
        const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
          polling: false,
        });

        await bot.sendMessage(
          chatId,
          "Sizga bu botdan foydalanishga ruxsat berilmagan."
        );
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({
            success: false,
            error: "Unauthorized",
          }),
        };
      }

      // Initialize bot for responses
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: false,
      });

      // Handle commands
      if (messageText === "/start") {
        await bot.sendMessage(
          chatId,
          "Assalomu alaykum! Bu buyurtmalarni kuzatish uchun bot."
        );
      } else {
        await bot.sendMessage(
          chatId,
          "Buyruq notanish. Mavjud buyruqlar: /start"
        );
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Update processed" }),
    };
  } catch (error) {
    console.error("Error processing Telegram update:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};

#!/usr/bin/env node

// Script to test Telegram bot functionality
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

async function testTelegram() {
  try {
    // Check if required environment variables are set
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      console.error(
        "❌ Error: TELEGRAM_BOT_TOKEN is not set in environment variables"
      );
      process.exit(1);
    }

    if (!process.env.MAIN_ADMIN_IDS) {
      console.error(
        "❌ Error: MAIN_ADMIN_IDS is not set in environment variables"
      );
      process.exit(1);
    }

    // Initialize bot
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: false,
    });

    // Get admins
    const admins = process.env.MAIN_ADMIN_IDS.split(",");

    console.log("🔄 Testing Telegram bot...");
    console.log(
      `🤖 Bot Token: ${process.env.TELEGRAM_BOT_TOKEN.substring(0, 10)}...`
    );
    console.log(`👥 Admins: ${admins.length}`);

    // Test message
    const testMessage = `✅ Telegram bot test successful!\nTime: ${new Date().toLocaleString(
      "uz-UZ"
    )}`;

    // Send test message to each admin
    for (const adminId of admins) {
      try {
        await bot.sendMessage(adminId.trim(), testMessage, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "❌ Test Delete",
                  callback_data: "test_delete",
                },
              ],
            ],
          },
        });
        console.log(`✅ Successfully sent test message to admin ${adminId}`);
      } catch (error) {
        console.error(
          `❌ Failed to send message to admin ${adminId}:`,
          error.message
        );
      }
    }

    console.log("✅ Telegram bot test completed!");
  } catch (error) {
    console.error("❌ Error testing Telegram bot:", error.message);
    process.exit(1);
  }
}

// Run the test
testTelegram();

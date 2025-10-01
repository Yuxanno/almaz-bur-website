#!/usr/bin/env node

// Script to set up Telegram webhook for the bot
import TelegramBot from "node-telegram-bot-api";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

async function setupWebhook() {
  try {
    // Check if required environment variables are set
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      console.error(
        "❌ Error: TELEGRAM_BOT_TOKEN is not set in environment variables"
      );
      console.log("Please set TELEGRAM_BOT_TOKEN in your .env file");
      process.exit(1);
    }

    if (!process.env.DEPLOY_URL) {
      console.error("❌ Error: DEPLOY_URL is not set in environment variables");
      console.log(
        "Please set DEPLOY_URL in your .env file (e.g., https://your-site.netlify.app)"
      );
      process.exit(1);
    }

    // Initialize bot
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: false,
    });

    // Set webhook URL - corrected to match Netlify Functions path
    const webhookUrl = `${process.env.DEPLOY_URL}/.netlify/functions/telegram-webhook`;

    console.log("🔄 Setting up Telegram webhook...");
    console.log(`🔗 Webhook URL: ${webhookUrl}`);

    // Set the webhook
    await bot.setWebHook(webhookUrl);

    // Get webhook info to verify
    const webhookInfo = await bot.getWebHookInfo();

    console.log("✅ Webhook setup completed successfully!");
    console.log("📋 Webhook Info:");
    console.log(`   URL: ${webhookInfo.url}`);
    console.log(
      `   Has Custom Certificate: ${webhookInfo.has_custom_certificate}`
    );
    console.log(`   Pending Update Count: ${webhookInfo.pending_update_count}`);

    if (webhookInfo.last_error_date) {
      console.log(
        `   Last Error Date: ${new Date(webhookInfo.last_error_date * 1000)}`
      );
      console.log(`   Last Error Message: ${webhookInfo.last_error_message}`);
    }
  } catch (error) {
    console.error("❌ Error setting up Telegram webhook:", error.message);
    process.exit(1);
  }
}

// Run the setup
setupWebhook();

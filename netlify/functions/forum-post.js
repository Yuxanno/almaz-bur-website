const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");

// MongoDB connection with caching to avoid top-level await
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    cachedConnection = conn;
    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Define the Forum Post schema
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

// Create the model (avoiding model overwrite)
const ForumPost =
  mongoose.models.ForumPost || mongoose.model("ForumPost", forumPostSchema);

// Main handler function
exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  try {
    // Connect to database
    await connectToDatabase();

    // Handle different HTTP methods
    switch (event.httpMethod) {
      case "POST":
        return await createPost(event, headers);

      case "GET":
        return await getPosts(event, headers);

      case "PUT":
        return await updatePost(event, headers);

      case "DELETE":
        return await deletePost(event, headers);

      default:
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
    console.error("Error in forum post function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Internal server error",
        error: error.message,
      }),
    };
  }
};

// Create a new forum post
async function createPost(event, headers) {
  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.title || !data.content || !data.author || !data.category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Title, content, author, and category are required",
        }),
      };
    }

    // Create new post
    const newPost = new ForumPost({
      title: data.title,
      content: data.content,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
    });

    const savedPost = await newPost.save();

    // Send notification to Telegram admins
    console.log("Attempting to send Telegram notifications...");
    console.log("TELEGRAM_BOT_TOKEN exists:", !!process.env.TELEGRAM_BOT_TOKEN);
    console.log("MAIN_ADMIN_IDS exists:", !!process.env.MAIN_ADMIN_IDS);

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.MAIN_ADMIN_IDS) {
      const admins = process.env.MAIN_ADMIN_IDS.split(",");
      console.log("Admin IDs found:", admins);

      const messageText = `📝 Yangi forum post:

Sarlavha: ${data.title}
Muallif: ${data.author}
Toifa: ${data.category}
Tavsif: ${data.content}
Yaratilgan vaqt: ${new Date().toLocaleString("uz-UZ")}`;

      // Initialize bot for sending message
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: false,
      });

      for (const adminId of admins) {
        try {
          console.log(`Sending message to admin ${adminId.trim()}...`);
          await bot.sendMessage(adminId.trim(), messageText, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "❌ O'chirish",
                    callback_data: `delete_forum_${savedPost._id}`,
                  },
                ],
              ],
            },
          });
          console.log(`Successfully sent message to admin ${adminId.trim()}`);
        } catch (error) {
          console.error(`Failed to send message to admin ${adminId}:`, error);
        }
      }
    } else {
      console.log("Telegram notifications not sent - missing configuration");
      console.log(
        "TELEGRAM_BOT_TOKEN:",
        process.env.TELEGRAM_BOT_TOKEN ? "SET" : "NOT SET"
      );
      console.log(
        "MAIN_ADMIN_IDS:",
        process.env.MAIN_ADMIN_IDS ? "SET" : "NOT SET"
      );
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Forum post created successfully",
        post: savedPost,
      }),
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to create post",
        error: error.message,
      }),
    };
  }
}

// Get forum posts with pagination
async function getPosts(event, headers) {
  try {
    const queryParams = event.queryStringParameters || {};
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const category = queryParams.category;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (category) {
      query.category = category;
    }

    // Fetch posts
    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await ForumPost.countDocuments(query);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPosts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      }),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      }),
    };
  }
}

// Update a forum post
async function updatePost(event, headers) {
  try {
    const postId = event.path.split("/").pop();
    const data = JSON.parse(event.body);

    // Validate post ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Invalid post ID",
        }),
      };
    }

    // Update post
    const updatedPost = await ForumPost.findByIdAndUpdate(
      postId,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Post not found",
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Post updated successfully",
        post: updatedPost,
      }),
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to update post",
        error: error.message,
      }),
    };
  }
}

// Delete a forum post
async function deletePost(event, headers) {
  try {
    const postId = event.path.split("/").pop();

    // Validate post ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Invalid post ID",
        }),
      };
    }

    // Delete post
    const deletedPost = await ForumPost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Post not found",
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Post deleted successfully",
      }),
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Failed to delete post",
        error: error.message,
      }),
    };
  }
}

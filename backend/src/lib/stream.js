import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("❌ Stream API key or secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// Create or update a Stream user
export const upsertStreamUser = async (userData) => {
  try {
    if (!userData.id) throw new Error("User data must include an 'id'");
    const response = await streamClient.upsertUsers([userData]);
    return response;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

// Generate Stream auth token for a given user
export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};

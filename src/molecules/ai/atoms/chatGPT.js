import { ChatGPTAPI } from "chatgpt";
import assert from "node:assert";
import dotenv from "dotenv";
import base64url from "base64url";
dotenv.config();

export async function chatGpt(input) {
  try {
    const api = new ChatGPTAPI({ sessionToken: process.env.CHAT_API_TOKEN });
    await api.ensureAuth();
    assert.equal(Boolean(input.length), true);
    const decodedInput = base64url.decode(input);

    const response = await api.sendMessage(decodedInput);
    return response;
  } catch (error) {
    return null;
  }
}

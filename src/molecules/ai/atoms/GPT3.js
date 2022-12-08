import { Configuration, OpenAIApi } from "openai";
import assert from "node:assert";
import dotenv from "dotenv";
import base64url from "base64url";
dotenv.config();

const MAX_TOKENS = 50;

// https://beta.openai.com/docs/api-reference/completions/create
export async function GPT3(prompt, model, max_tokens, temperature, top_p) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });
    
    const decoded_prompt = base64url.decode(prompt);
    const openai = new OpenAIApi(configuration);
    
    assert.equal(Boolean(decoded_prompt.length > 0), true);
    assert.equal(Boolean(model.length > 0), true);
    assert.equal(Boolean(max_tokens <= MAX_TOKENS), true);

    const promptObject = {
      prompt: decoded_prompt,
      model: model,
      max_tokens: max_tokens,
    };

    if (temperature || temperature == 0) {
      assert.equal(Boolean(temperature <= 1 && temperature >= 0), true);
      promptObject.temperature = Number(temperature);
    };

    if (top_p || top_p == 0) {
      assert.equal(Boolean(top_p <= 1 && top_p >= 0), true);
      promptObject.top_p = Number(top_p);
    };

    const response = await openai.createCompletion(promptObject);
    return response.data.choices[0].text;
  } catch (error) {
    return error;
  }
}

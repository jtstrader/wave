import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

export const TOKEN: string = process.env.TOKEN!;
export const CLIENT_ID: string = process.env.CLIENT_ID!;
export const OPENAI_KEY: string = process.env.OPENAI_KEY!;

export const OPENAI = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_KEY,
  })
);

export const GPT_COMPLETION_OPTS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;",
    authorization: `Bearer ${OPENAI_KEY}`,
  },
  body: "",
};

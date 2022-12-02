import { GPT_COMPLETION_OPTS } from "@utils/constants";
import {
  Command,
  OpenAICompletionResponse,
  OpenAIRequest,
} from "@utils/interfaces";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

/**
 * Parse the response and grab the text in the choices property.
 *
 * @param res The OpenAI response
 * @returns The parsed response in text form
 */
function parseResponse(res: OpenAICompletionResponse): string {
  // Assume first text response for now
  let text: string = res.choices[0].text;
  let i: number = 0;
  while (text.at(i) === "\n") {
    i++;
  }
  return text.substring(i);
}

/**
 * Ask Ada a question using OpenAI's GPT-3.
 */
export const GPT: Command = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Ask Ada a question!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask Ada")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    let options = GPT_COMPLETION_OPTS;
    let request_body: OpenAIRequest = {
      model: "text-ada-001",
      prompt: interaction.options.getString("question") ?? "I like cheese :D",
      max_tokens: 200,
      temperature: 0.9,
    };
    options.body = JSON.stringify(request_body);

    fetch("https://api.openai.com/v1/completions", GPT_COMPLETION_OPTS)
      .then((res) => res.json())
      .then(async (json) => await interaction.reply(parseResponse(json)));
  },
};

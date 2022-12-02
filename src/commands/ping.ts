import { Command } from "@utils/interfaces";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

/**
 * Test connection with a ping command and respond with Pong!
 */
export const Ping: Command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),

  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply("Pong!");
  },
};

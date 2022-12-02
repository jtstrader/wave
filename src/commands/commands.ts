import { REST, Routes } from "discord.js";
import { TOKEN, CLIENT_ID } from "@utils/constants";
import { Ping } from "@commands/ping";
import { GPT } from "@commands/gpt";

export const client_commands = [Ping, GPT];

/**
 * Use `client_commands` to refresh server with command list. Does NOT refresh
 * the CommandClient's command collection.
 */
export async function refresh_slash_commands() {
  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: client_commands.map((cmd) => cmd.data.toJSON()),
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

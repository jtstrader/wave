import { refresh_slash_commands } from "@commands/commands";
import { Command, CommandClient } from "@utils/interfaces";
import { Client, ClientOptions, Collection } from "discord.js";

/**
 * Create a client object with the provided configuration and event listeners.
 *
 * @param options The client configuration options
 * @param commands A list of commands to be linked to the client
 * @returns A client object that will run the application
 */
export function create_client(
  options: ClientOptions,
  commands: Command[]
): Client {
  const client = new CommandClient(options, commands);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);

    client.user?.setActivity("Wave 💖 Ada");
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  });

  // Load slash commands for the first time
  refresh_slash_commands();

  return client;
}

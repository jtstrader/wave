import { GatewayIntentBits } from "discord.js";
import { TOKEN } from "@utils/constants";
import { client_commands } from "@commands/commands";
import { create_client } from "@lib";

const client = create_client(
  { intents: [GatewayIntentBits.Guilds] },
  client_commands
);

client.login(TOKEN);

import { Client, ClientOptions, CommandInteraction } from "discord.js";

/**
 * An extended client to include a command collection.
 */
export class CommandClient extends Client {
  /**
   * A map between a command's name and its command information.
   */
  public commands: Map<string, Command>;

  constructor(options: ClientOptions, commands: Command[]) {
    super(options);
    this.commands = new Map();

    commands.forEach((cmd) => {
      this.commands.set(cmd.data.name, cmd);
    });
  }
}

/**
 * Represents a command that has an interaction context.
 */
export interface Command {
  data: any;
  execute(interaction: CommandInteraction): Promise<void>;
}

/**
 * OpenAI GTP-3 Request
 */
export interface OpenAIRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
}

/**
 * OpenAI GTP-3 Completion Response
 */
export interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAICompletionChoices[];
  usage: OpenAICompletionUsage[];
}

/**
 * OpenAI GTP-3 Completion Choices
 */
export interface OpenAICompletionChoices {
  text: string;
  index: number;
  logprobs?: number;
  finish_reason: string;
}

/**
 * OpenAI GTP-3 Completion Usage
 */
export interface OpenAICompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

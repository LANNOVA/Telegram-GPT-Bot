# Telegram-GPT-Bot


Telegram-GPT-Bot is a Node.js extension for creating a Telegram bot that utilizes the ChatGPT API for generating AI-powered responses. The bot is designed to work in a Telegram group chat and is authorized for specific user IDs. It can process text messages and generate responses using the ChatGPT API, with support for clearing the conversation history and setting a timeout.

## Installation

1. Clone the repository:git clone <repository-url>


2. Install dependencies: npm install


3. Set up environment variables:

You need to set the following environment variables for the bot to work:

- `TELEGRAM_BOT_TOKEN`: Telegram bot token. You can obtain this by creating a bot on Telegram using the BotFather.
- `OPENAI_API_KEY`: OpenAI API key. You can obtain this by signing up for an API key from the OpenAI website.

4. Run the bot: node index.js


## Usage

1. Add the bot to your Telegram group chat and make sure it has the necessary permissions to read and send messages.

2. Start a conversation with the bot by sending a text message in the group chat. The bot will respond with AI-generated messages using the ChatGPT API.

3. You can use the following commands with the bot:

- `/reset`: Resets the conversation history with the bot.
- (Other commands or usage instructions specific to your extension)

## Configuration

You can configure the behavior of the bot by modifying the constants defined in the `index.js` file, such as `GROUP_NAME`, `ALLOWED_USER_IDS`, `TIMEOUT`, `PREFIX`, `UNAUTHORIZED_MSG`, `CLEARED_MSG`, `WAITING_MSG`, `ERROR_MSG`, and `RETRY_COUNT`.

## Contributing

Contributions to Telegram-GPT-Bot are welcome! If you would like to contribute, please follow the [contribution guidelines](CONTRIBUTING.md).


## DONATE SRAVstudios

**BTC** - bc1q5kmqqynratseyh7v0n8q58rn7p5xejuemmc4px

**USDT(ETH)**  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572

**USDT(SOLANA)**  - 4MjmiAwiQT1cqb5fSpvdsKCabZAKxopcMsTqem9gWBqB

**USDT(POLYGON)**  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572

**ETH**  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572




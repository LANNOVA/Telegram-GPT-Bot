import TelegramBot from 'node-telegram-bot-api';
import { ChatGPTAPI } from 'chatgpt';
const GROUP_NAME = 'chat';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_KEY = process.env.OPENAI_API_KEY;
const ALLOWED_USER_IDS = [5143739428, 945362475];
const TIMEOUT = 10 * 60 * 1000;
const PREFIX = GROUP_NAME ? new RegExp(`${GROUP_NAME}`) : /\/gpt/;
const UNAUTHORIZED_MSG = (userId) => `${userId} - неавторизованный пользователь
Если хотите поболтать с Евой напишите в лс @Opex_xD`;
const CLEARED_MSG = 'Разговор очищен.';
const WAITING_MSG = 'Дай немнога подумать🤔';
const ERROR_MSG = 'Какаято ошипка😬 Проводятся технические шоколадки или сервер находится в канаве..😔';
const RETRY_COUNT = 3;
 
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const api = new ChatGPTAPI({ apiKey: API_KEY });
const messageIds = new Map();
 
bot.on('text', async ({ text, chat: { id: chatId }, message_id: messageId }) => {
  console.log(`${new Date().toLocaleString()} -- Received message from id: ${chatId}: ${text}`);
  await handleMessage({ text, chatId, messageId });
});
 
async function handleMessage({ text, chatId, messageId }, retryCount = 0) {
  if (typeof text !== 'string') return;
 
  if (!ALLOWED_USER_IDS.includes(chatId)) {
    await bot.sendMessage(chatId, UNAUTHORIZED_MSG(chatId));
    return;
  }
 
  if (text === '/reset') {
    messageIds.delete(chatId);
    await bot.sendMessage(chatId, CLEARED_MSG);
    return;
  }
 
  const [parentId = null, tempId = null] = (messageIds.get(chatId) ?? '').split(',');
 
  let response, tempMessage;
  try {
    tempMessage = await bot.sendMessage(chatId, WAITING_MSG, { reply_to_message_id: messageId });
    response = parentId ? await api.sendMessage(text.replace(PREFIX, ''), { parentMessageId: parentId }) : await api.sendMessage(text.replace(PREFIX, ''));
    console.log(`${new Date().toLocaleString()} -- AI response to <${text}>: ${response.text}`);
    await bot.editMessageText(response.text, { parse_mode: 'Markdown', chat_id: chatId, message_id: tempMessage.message_id });
  } catch (err) {
    console.error(`${new Date().toLocaleString()} -- Error in AI response to <${text}>: ${err.message}`);
    if (retryCount < RETRY_COUNT) {
      console.log(`${new Date().toLocaleString()} -- Retrying AI response to <${text}>`);
      handleMessage({ text, chatId, messageId }, retryCount + 1);
      return;
    } else {
      console.error(`${new Date().toLocaleString()} -- Failed to get AI response after ${RETRY_COUNT} attempts.`);
      await bot.sendMessage(chatId, ERROR_MSG, { reply_to_message_id: messageId });
      return;
    }
  }
 
  const newMsgId = `${response.id},${tempMessage.message_id}`;
  messageIds.set(chatId, newMsgId);
 
  setTimeout(() => {
    messageIds.delete(chatId);
  }, TIMEOUT);
                                                }
/*
DONATE SRAVstudios

BTC - bc1q5kmqqynratseyh7v0n8q58rn7p5xejuemmc4px

USDT(ETH)  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572

USDT(SOLANA)  - 4MjmiAwiQT1cqb5fSpvdsKCabZAKxopcMsTqem9gWBqB

USDT(POLYGON)  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572

ETH  - 0x8558288490E11E7F900471E7D52F0b0A0B6b8572*/

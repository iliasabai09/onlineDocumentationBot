import {Telegraf} from "telegraf";
import dotenv from "dotenv";
import {getMsgDocument, saveDocument} from "./routes/document.route.js";
import {MessageRoutes} from "./routes/index.js";

dotenv.config();

const {BOT_TOKEN} = process.env

// Создаем экземпляр бота
const bot = new Telegraf(BOT_TOKEN);

// Добавляем команды и обработчики
// Ответ на команду /start
bot.start((ctx) => {
    ctx.reply('Привет! Я бот и могу работать в этой группе.');
});

// Ответ на команду /help
bot.help((ctx) => {
    ctx.reply('Запарил!');
});


bot.on('message', async (ctx) => {
    const MSG_ROUTES = new MessageRoutes(ctx);
    if (MSG_ROUTES.saveMsg()) return saveDocument(ctx)
    if (MSG_ROUTES.getMsg()) return getMsgDocument(ctx)
})

// Ответ на упоминание бота
bot.mention('botusername', (ctx) => {
    ctx.reply('Вы упомянули меня!');
});

// Запускаем бота
bot.launch().then(() => {
    console.log('Бот успешно запущен!');
});

// Обработка SIGINT и SIGTERM для корректного завершения
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

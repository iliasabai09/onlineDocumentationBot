import {createDocument, getDocument} from "../controllers/product.controller.js";
import {Loader} from "../shared/utils/loader.js";

export async function saveDocument(ctx) {
    try {
        const L = new Loader(ctx)
        await L.on('⏳ Сохраняю сообщение...')
        const data = {
            createdAt: new Date().toISOString(),
            groupId: ctx.message.message_thread_id,
            msg: ctx.message.reply_to_message.text,
        }
        await createDocument(data)
        await L.edit('✅ Сообщение сохранено!')
        await ctx.deleteMessage(ctx.message.message_id);
        L.remove()
    } catch (err) {
        console.error('Ошибка при сохранении сообщения:', err);
        await ctx.reply('Произошла ошибка при сохранении сообщения.');
    }
}

export async function getMsgDocument(ctx) {
    try {
        const L = new Loader(ctx)
        await L.on('⏳ Получаю сообщение...')
        const data = await getDocument(ctx.message.reply_to_message.text)
        await L.edit(data.msg)
        await ctx.deleteMessage(ctx.message.message_id);
    } catch (err) {
        console.error('Ошибка при сохранении сообщения:', err);
        await ctx.reply('Произошла ошибка при сохранении сообщения.');
    }
}
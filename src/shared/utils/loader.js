// export async function loader(ctx) {
//     let loaderMessage = null;
//     return {
//         on: async (msg) => {
//             loaderMessage = await ctx.reply(msg);
//         },
//         edit: async (msg) => {
//             await ctx.telegram.editMessageText(
//                 loaderMessage.chat.id,
//                 loaderMessage.message_id,
//                 undefined,
//                 msg
//             );
//         },
//         remove: async (debounce = 2000) => {
//             setTimeout(() => {
//                 ctx.deleteMessage(loaderMessage.message_id).catch((err) => console.error('Ошибка удаления уведомления:', err));
//             }, debounce);
//         }
//     }
// }

export class Loader {
    loaderMessage = null;
    ctx = null;

    constructor(ctx) {
        this.ctx = ctx;
    }

    async on(msg) {
        this.loaderMessage = await this.ctx.reply(msg);
    }

    async edit(msg) {
        await this.ctx.telegram.editMessageText(
            this.loaderMessage.chat.id,
            this.loaderMessage.message_id,
            undefined,
            msg
        );
    }

    remove(debounce = 2000) {
        const time = setTimeout(() => {
            this.ctx.deleteMessage(this.loaderMessage.message_id).catch((err) => console.error('Ошибка удаления уведомления:', err));
            clearTimeout(time);
        }, debounce);
    }
}
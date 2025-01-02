export class MessageRoutes {
    message = null;

    constructor(ctx) {
        this.message = ctx.message;
    }

    saveMsg() {
        return this.message.reply_to_message.text && this.message.text.toLowerCase().startsWith('сохранить')
    }
    getMsg() {
        return this.message.reply_to_message.text && this.message.text.toLowerCase().startsWith('получить')
    }
}
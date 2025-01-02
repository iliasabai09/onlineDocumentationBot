export const isReply = (ctx) => {
    const message = ctx.message;
    return message.reply_to_message
}
export const isStartWith = (ctx, msg) => {
    const message = ctx.message;
    message.text.toLowerCase().startsWith(msg?.toLowerCase())
}
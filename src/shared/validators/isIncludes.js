export const isIncludes = (ctx, msg) => {
    const message = ctx.message;
    message.text.toLowerCase().includes(msg?.toLowerCase())
}
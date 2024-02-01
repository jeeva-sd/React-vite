export function exception(error: Error | any): { message: string; stack?: string; } {
    const { message = null, stack = null } = error;

    if (message) console.warn(message);
    if (stack) console.warn(stack);

    return { message, stack };
}

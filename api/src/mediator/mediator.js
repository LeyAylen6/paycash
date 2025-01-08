const mediator = () => {
    const handlers = {};

    const registerHandler = (commandType, handler) => {
        handlers[commandType] = handler;
    };

    const send = async (commandOrQuery) => {
        const handler = handlers[commandOrQuery.type];

        if (!handler) {
            throw new Error(`Handler not found for ${commandOrQuery.type}`);
        }

        return await handler(commandOrQuery);
    };

    return { registerHandler, send };
};

module.exports = mediator;
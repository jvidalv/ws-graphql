import { createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { createClient as createWSClient } from 'graphql-ws';

const wsClient = createWSClient({
    url: 'ws://localhost:4001/graphql',
});

export const client = createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: (operation) => ({
                subscribe: (sink) => ({
                    unsubscribe: wsClient.subscribe(operation, sink),
                }),
            }),
        }),
    ],
});
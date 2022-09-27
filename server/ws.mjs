import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './graphql.mjs';

const server = new WebSocketServer({
    port: 4001,
    path: '/graphql',
});

useServer({ schema }, server);

console.log('Running a GraphQL API WebSocket server at ws://localhost:4001/graphql ✅');

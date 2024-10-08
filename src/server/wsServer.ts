import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from "ws";
import {createContext} from "~/server/context";
import {websocketRouter} from "~/server/api/routers/websocket";

const wss = new WebSocketServer({
    port: 3001,
    host: '0.0.0.0',
});
const handler = applyWSSHandler({
    wss,
    router: websocketRouter,
    createContext,
    // Enable heartbeat messages to keep connection open (disabled by default)
    keepAlive: {
        enabled: true,
        // server ping message interval in milliseconds
        pingMs: 30000,
        // connection is terminated if pong message is not received in this many milliseconds
        pongWaitMs: 5000,
    },
});

wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});
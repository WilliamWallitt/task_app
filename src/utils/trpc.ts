// create persistent WebSocket connection
import {createTRPCClient, createWSClient, wsLink} from "@trpc/client";
import {WSRouter} from "~/server/api/routers/websocket";
import superjson from "superjson";

const wsClient = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL ?? `ws://localhost:3001`, // Fallback for local development
    connectionParams: async () => {
        return {
            token: 'supersecret',
        };
    },
});


export const trpc = createTRPCClient<WSRouter>({
    links: [wsLink({ client: wsClient, transformer: superjson })],
});

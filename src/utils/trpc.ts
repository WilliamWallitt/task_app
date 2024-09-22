// create persistent WebSocket connection
import {createTRPCClient, createWSClient, wsLink} from "@trpc/client";
import {WSRouter} from "~/server/api/routers/websocket";
import superjson from "superjson";

const wsClient = createWSClient({
    url: `ws://192.168.1.54:3001`,
    connectionParams: async () => {
        return {
            token: 'supersecret',
        };
    },
});


export const trpc = createTRPCClient<WSRouter>({
    links: [wsLink({ client: wsClient, transformer: superjson })],
});

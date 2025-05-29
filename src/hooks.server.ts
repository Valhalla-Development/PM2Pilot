import { pm2Client } from '$lib/server/pm2Client';
import type { Handle } from '@sveltejs/kit';

// Initialize PM2 connection
await pm2Client.connect();

export const handle: Handle = async ({ event, resolve }) => {
    return await resolve(event);
};

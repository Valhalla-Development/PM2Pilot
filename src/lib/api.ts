import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { PM2Service } from './server/pm2';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());

// Health check
app.get('/health', (c) => {
    return c.json({ status: 'ok' });
});

// PM2 routes
app.get('/list', async (c) => {
    try {
        const pm2Service = new PM2Service();
        const processes = await pm2Service.listProcesses();
        return c.json({
            success: true,
            message: `Found ${processes.length} processes`,
            processes: processes.map(process => ({
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit
            }))
        });
    } catch (error) {
        return c.json({
            success: false,
            error: 'Failed to list processes',
            details: error instanceof Error ? error.message : undefined
        }, 500);
    }
});

// Create the API router
const router = new Hono();
router.route('/pm2', app);

// Export the API
export const api = new Hono().route('/api', router);

// Export types for type safety
export type AppType = typeof app;
export type RouterType = typeof router;

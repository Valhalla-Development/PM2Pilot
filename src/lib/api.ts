import * as os from 'node:os';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { PM2Service } from './server/pm2';
import { pm2Client } from './server/pm2Client';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());

// System info route
app.get('/system', (c) => {
    try {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const cpus = os.cpus();

        return c.json({
            success: true,
            system: {
                totalMemoryBytes: totalMemory,
                freeMemoryBytes: freeMemory,
                usedMemoryBytes: totalMemory - freeMemory,
                cpuCount: cpus.length,
                platform: os.platform(),
                arch: os.arch(),
                uptime: os.uptime(),
            },
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to get system info',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

// PM2 routes
app.get('/list', async (c) => {
    try {
        const pm2Service = new PM2Service();
        const processes = await pm2Service.listProcesses();
        return c.json({
            success: true,
            message: `Found ${processes.length} processes`,
            processes: processes.map((process) => ({
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit,
            })),
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to list processes',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

app.get('/describe/:id', async (c) => {
    try {
        const id = Number.parseInt(c.req.param('id'));
        const pm2Service = new PM2Service();
        const process = await pm2Service.describeProcess(id);

        return c.json({
            success: true,
            message: 'Process details fetched successfully',
            process: {
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit,
            },
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to get process details',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

app.post('/restart/:id', async (c) => {
    try {
        const id = Number.parseInt(c.req.param('id'));
        const pm2Service = new PM2Service();
        await pm2Service.restartProcess(id);

        // Get updated process info
        const process = await pm2Service.describeProcess(id);

        return c.json({
            success: true,
            message: 'Process restarted successfully',
            process: {
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit,
            },
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to restart process',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

app.post('/stop/:id', async (c) => {
    try {
        const id = Number.parseInt(c.req.param('id'));
        const pm2Service = new PM2Service();
        await pm2Service.stopProcess(id);

        // Get updated process info
        const process = await pm2Service.describeProcess(id);

        return c.json({
            success: true,
            message: 'Process stopped successfully',
            process: {
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit,
            },
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to stop process',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

app.post('/start/:id', async (c) => {
    try {
        const id = Number.parseInt(c.req.param('id'));
        const pm2Service = new PM2Service();
        await pm2Service.startProcess(id);

        // Get updated process info
        const process = await pm2Service.describeProcess(id);

        return c.json({
            success: true,
            message: 'Process started successfully',
            process: {
                pid: process.pid,
                name: process.name,
                pm_id: process.pm_id,
                status: process.pm2_env?.status,
                pm_uptime: process.pm2_env?.pm_uptime,
                restart_time: process.pm2_env?.restart_time,
                unstable_restarts: process.pm2_env?.unstable_restarts,
                monit: process.monit,
            },
        });
    } catch (error) {
        return c.json(
            {
                success: false,
                error: 'Failed to start process',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

// Create the API router
const router = new Hono();

// Health check at root API level
router.get('/health', (c) => {
    try {
        const pm2Connected = pm2Client.isConnected();
        return c.json({
            status: 'ok',
            services: {
                pm2: {
                    connected: pm2Connected,
                },
            },
        });
    } catch (error) {
        return c.json(
            {
                status: 'error',
                error: 'Health check failed',
                details: error instanceof Error ? error.message : undefined,
            },
            500
        );
    }
});

router.route('/pm2', app);

// Export the API
export const api = new Hono().route('/api', router);

// Export types for type safety
export type AppType = typeof app;
export type RouterType = typeof router;

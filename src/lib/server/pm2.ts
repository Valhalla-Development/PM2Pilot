import type { ProcessDescription } from 'pm2';
import { pm2Client } from './pm2Client';

export class PM2Service {
    async listProcesses(): Promise<ProcessDescription[]> {
        return pm2Client.getProcesses();
    }

    async describeProcess(id: number): Promise<ProcessDescription> {
        return pm2Client.describeProcess(id);
    }

    async restartProcess(id: number): Promise<void> {
        return pm2Client.restartProcess(id);
    }

    async stopProcess(id: number): Promise<void> {
        // Check process status before stopping
        const process = await this.describeProcess(id);
        if (process.pm2_env?.status === 'stopped') {
            throw new Error(`Process ${process.name} (${id}) is already stopped`);
        }
        return pm2Client.stopProcess(id);
    }

    async startProcess(id: number): Promise<void> {
        // Check process status before starting
        const process = await this.describeProcess(id);
        if (process.pm2_env?.status === 'online') {
            throw new Error(`Process ${process.name} (${id}) is already running`);
        }
        return pm2Client.startProcess(id.toString());
    }
} 
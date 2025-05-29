import pm2, { type ProcessDescription } from 'pm2';

class PM2Client {
    // Connection state
    private connected = false;

    // Connect to PM2
    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('Connecting to PM2...');
            pm2.connect((err) => {
                if (err) {
                    console.error('Failed to connect to PM2:', err);
                    reject(err);
                    return;
                }

                console.log('Connected to PM2, verifying connection...');
                pm2.list((err, list) => {
                    if (err) {
                        console.error('PM2 verification failed:', err);
                        pm2.disconnect();
                        reject(new Error('PM2 is not available'));
                        return;
                    }

                    console.log('PM2 connection verified, found', list.length, 'processes\n\n');
                    this.connected = true;
                    resolve();
                });
            });
        });
    }

    // Disconnect from PM2
    disconnect(): void {
        pm2.disconnect();
        this.connected = false;
    }

    // Check if connected
    isConnected(): boolean {
        return this.connected;
    }

    // Get processes
    async getProcesses(): Promise<ProcessDescription[]> {
        return new Promise((resolve, reject) => {
            pm2.list((err, list) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(list);
            });
        });
    }

    // Get detailed process information
    async describeProcess(id: number): Promise<ProcessDescription> {
        return new Promise((resolve, reject) => {
            pm2.describe(id, (err, list) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!list || list.length === 0) {
                    reject(new Error(`Process with id ${id} not found`));
                    return;
                }
                const process = list[0];
                if (!process) {
                    reject(new Error(`Process with id ${id} not found`));
                    return;
                }
                resolve(process);
            });
        });
    }

    // Start a process
    async startProcess(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            pm2.start(id, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    // Stop a process
    async stopProcess(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            pm2.stop(id, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    // Restart a process
    async restartProcess(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            pm2.restart(id, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}

// Export an instance
export const pm2Client = new PM2Client();

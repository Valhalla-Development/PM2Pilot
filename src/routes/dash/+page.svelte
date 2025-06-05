<script lang="ts">
import GlassCard from '$lib/components/GlassCard.svelte';
import ServerCard from '$lib/components/ServerCard.svelte';
import VantaBackground from '$lib/components/VantaBackground.svelte';
import { onMount } from 'svelte';
import { dev } from '$app/environment';

const vantaConfig = {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xdc4e7f,
    backgroundColor: 0x111827,
    points: 14.0,
    maxDistance: 25.0,
    spacing: 18.0,
};

let processes: Array<{
    name: string;
    status: 'online' | 'stopping' | 'stopped' | 'launching' | 'errored';
    cpu: number;
    memory: string;
    memoryBytes: number;
    restarts: number;
    uptime: string;
    pid: number | null;
}> = [];

let loading = true;
let error: string | null = null;
let totalSystemMemoryBytes = 8 * 1024 * 1024 * 1024; // Default fallback

// Function to format memory from bytes to human readable
function formatMemory(bytes: number): string {
    if (bytes === 0) {
        return '0 MB';
    }
    const mb = bytes / 1024 / 1024;
    if (mb >= 1024) {
        return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(0)} MB`;
}

// Function to format uptime from timestamp
function formatUptime(startTime: number): string {
    const now = Date.now();
    const uptimeMs = now - startTime;
    const seconds = Math.floor(uptimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ${hours % 24}h ${minutes % 60}m`;
    }
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
}

// Type for PM2 process data from API
interface PM2Process {
    name: string;
    status: string;
    monit?: {
        cpu: number;
        memory: number;
    };
    restart_time?: number;
    pm_uptime?: number;
    pid?: number;
}

// Function to fetch system info
async function fetchSystemInfo() {
    try {
        const response = await fetch('/api/pm2/system');
        const data = await response.json();
        
        if (data.success) {
            totalSystemMemoryBytes = data.system.totalMemoryBytes;
        }
    } catch (err) {
        console.warn('Failed to fetch system info, using default memory size');
    }
}

// Function to fetch PM2 processes
async function fetchProcesses() {
    try {
        loading = true;
        error = null;

        const response = await fetch('/api/pm2/list');
        const data = await response.json();

        if (data.success) {
            processes = data.processes.map((proc: PM2Process) => {
                let status: 'online' | 'stopping' | 'stopped' | 'launching' | 'errored';
                if (proc.status === 'online') {
                    status = 'online';
                } else if (proc.status === 'stopping') {
                    status = 'stopping';
                } else if (proc.status === 'launching') {
                    status = 'launching';
                } else if (proc.status === 'errored') {
                    status = 'errored';
                } else {
                    status = 'stopped';
                }

                return {
                    name: proc.name,
                    status,
                    cpu: proc.monit?.cpu || 0,
                    memory: formatMemory(proc.monit?.memory || 0),
                    memoryBytes: proc.monit?.memory || 0,
                    restarts: proc.restart_time || 0,
                    uptime: proc.pm_uptime ? formatUptime(proc.pm_uptime) : '0s',
                    pid: proc.pid || null,
                };
            });
        } else {
            throw new Error(data.error || 'Failed to fetch processes');
        }
    } catch (err) {
        console.error('Error fetching PM2 processes:', err);
        error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
        loading = false;
    }
}

onMount(() => {
    // Use mock data in development
    if (dev) {
        totalSystemMemoryBytes = 16 * 1024 * 1024 * 1024; // 16GB
        processes = [
            {
                name: 'api-server',
                status: 'online',
                cpu: 45.2,
                memory: '512 MB',
                memoryBytes: 512 * 1024 * 1024,
                restarts: 3,
                uptime: '2d 4h 32m',
                pid: 1234
            },
            {
                name: 'web-app',
                status: 'stopped',
                cpu: 0,
                memory: '0 MB',
                memoryBytes: 0,
                restarts: 12,
                uptime: '0s',
                pid: null
            },
            {
                name: 'worker-queue',
                status: 'errored',
                cpu: 15.8,
                memory: '256 MB',
                memoryBytes: 256 * 1024 * 1024,
                restarts: 8,
                uptime: '45m 12s',
                pid: 5678
            },
            {
                name: 'background-task',
                status: 'launching',
                cpu: 8.5,
                memory: '128 MB',
                memoryBytes: 128 * 1024 * 1024,
                restarts: 2,
                uptime: '1h 15m',
                pid: 9012
            },
            {
                name: 'cache-service',
                status: 'stopping',
                cpu: 3.2,
                memory: '64 MB',
                memoryBytes: 64 * 1024 * 1024,
                restarts: 5,
                uptime: '30m 45s',
                pid: 3456
            }
        ];
        loading = false;
        return;
    }

    fetchSystemInfo().then(() => {
        fetchProcesses();
    });

    // Refresh processes every 5 seconds
    // TODO: live?
    const interval = setInterval(fetchProcesses, 5000);

    return () => clearInterval(interval);
});
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<VantaBackground 
  vantaType="NET" 
  {vantaConfig}
>
  <div class="min-h-full py-8 px-6">
    <div class="w-full max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-white mb-8">Dashboard</h1>
      
      <GlassCard maxWidth="100%" padding="p-8">
        <div class="space-y-6">
          {#if loading}
            <div class="text-center text-white">
              <p>Loading PM2 processes...</p>
            </div>
          {:else if error}
            <div class="text-center text-red-400">
              <p>Error: {error}</p>
            </div>
          {/if}
          
          <!-- Server cards grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {#each processes as process}
              <ServerCard 
                name={process.name}
                status={process.status}
                cpu={process.cpu}
                memory={process.memory}
                memoryBytes={process.memoryBytes}
                totalSystemMemoryBytes={totalSystemMemoryBytes}
                uptime={process.uptime}
              />
            {/each}
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
</VantaBackground> 
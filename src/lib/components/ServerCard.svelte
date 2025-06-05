<script lang="ts">
export let name = 'Unknown';
export let status: 'online' | 'stopped' | 'errored' | 'stopping' = 'stopped';
export let cpu = 0;
export let memory = '0 MB';
export let memoryBytes = 0;
export let uptime = '0s';

// Map status to color schemes
const statusConfig = {
    online: 'green',
    stopped: 'red',
    errored: 'red',
    stopping: 'orange',
};

$: statusClass = statusConfig[status];

export let totalSystemMemoryBytes = 8 * 1024 * 1024 * 1024;

// Memory percentage based on total system memory
$: memoryPercent = Math.min((memoryBytes / totalSystemMemoryBytes) * 100, 100);
</script>

<div class="card {statusClass}">
    <div class="card-header">
        <div class="date">
            {uptime}
        </div>
    </div>
    
    <div class="card-body">
        <h3>{name}</h3>
        <div class="progress">
            <span>CPU Usage</span>
            <div class="progress-bar cpu-bar" style="--cpu-width: {cpu}%"></div>
            <span>{cpu.toFixed(1)}%</span>
        </div>
        <div class="progress">
            <span>Memory Usage</span>
            <div class="progress-bar memory-bar" style="--memory-width: {memoryPercent}%"></div>
            <span>{memory}</span>
        </div>
    </div>
    
    <div class="card-footer">
        <a href="#" class="btn-countdown btn-start">Start</a>
        <a href="#" class="btn-countdown btn-stop">Stop</a>
        <a href="#" class="btn-countdown btn-restart">Restart</a>
    </div>
</div>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap");

.card {
    position: relative;
    z-index: 555;
    max-width: 20rem;
    min-height: 20rem;
    width: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    text-align: center;
    box-shadow: 0.063em 0.75em 1.563em rgb(0 0 0 / 78%);
    border-radius: 2.25rem;
    font-family: "Nunito", sans-serif;
}

.card::before {
    position: absolute;
    content: "";
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 2.25rem;
    z-index: -1;
    border: 0.155rem solid transparent;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
}

.card-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 0.5em 0em 1.5em;
}

.card-header .date {
    color: #ddd;
    font-size: 0.9rem;
}

.card-body {
    position: absolute;
    width: 100%;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.7em 1.25em 0.5em 1.5em;
}

.card-body h3 {
    color: #fff;
    font-size: 1.375rem;
    margin-top: 0.625em;
    margin-bottom: 0.188em;
    text-transform: capitalize;
    font-weight: 600;
}

.progress {
    margin-top: 0.938rem;
}

.progress-bar {
    position: relative;
    width: 100%;
    background: #363636;
    height: 0.313rem;
    display: block;
    border-radius: 3.125rem;
}

.progress-bar::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: block;
    border-radius: 3.125rem;
}

.progress span:first-of-type {
    color: #fff;
    text-align: left;
    font-weight: 600;
    width: 100%;
    display: block;
    margin-bottom: 0.313rem;
}

.progress span:last-of-type {
    margin-top: 0.313rem;
    text-align: right;
    display: block;
    color: #fff;
}

.card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-top: 0.063rem solid #292929;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7em 1.25em 0.7em 1.25em;
    border-bottom-left-radius: 2.25rem;
    border-bottom-right-radius: 2.25rem;
    gap: 0.5rem;
}

.btn-countdown {
    background: #222127;
    color: #fff;
    border-radius: 2em;
    padding: 0.625rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    flex: 1;
}

/* Status-based styling */
.green {
    background: radial-gradient(
        ellipse at right top,
        #107667ed 0%,
        #151419 47%,
        #151419 100%
    );
}

.green::before {
    background: linear-gradient(
        45deg,
        #232228,
        #232228,
        #232228,
        #232228,
        #01c3a8
    ) border-box;
}

.green .cpu-bar::after {
    width: var(--cpu-width, 0%);
    background: #01c3a8;
}

.green .memory-bar::after {
    width: var(--memory-width, 0%);
    background: #01c3a8;
}

.blue {
    background: radial-gradient(
        ellipse at right top,
        #00458f8f 0%,
        #151419 45%,
        #151419 100%
    );
}

.blue::before {
    background: linear-gradient(
        45deg,
        #232228,
        #232228,
        #232228,
        #232228,
        #1890ff
    ) border-box;
}

.blue .cpu-bar::after {
    width: var(--cpu-width, 0%);
    background: #1890ff;
}

.blue .memory-bar::after {
    width: var(--memory-width, 0%);
    background: #1890ff;
}

.orange {
    background: radial-gradient(
        ellipse at right top,
        #ffb74194 0%,
        #151419 47%,
        #151419 100%
    );
}

.orange::before {
    background: linear-gradient(
        45deg,
        #232228,
        #232228,
        #232228,
        #232228,
        #ffb741
    ) border-box;
}

.orange .cpu-bar::after {
    width: var(--cpu-width, 0%);
    background: #ffb741;
}

.orange .memory-bar::after {
    width: var(--memory-width, 0%);
    background: #ffb741;
}

.red {
    background: radial-gradient(
        ellipse at right top,
        #a63d2a82 0%,
        #151419 47%,
        #151419 100%
    );
}

.red::before {
    background: linear-gradient(
        45deg,
        #232228,
        #232228,
        #232228,
        #232228,
        #a63d2a
    ) border-box;
}

.red .cpu-bar::after {
    width: var(--cpu-width, 0%);
    background: #a63d2a;
}

.red .memory-bar::after {
    width: var(--memory-width, 0%);
    background: #a63d2a;
}

/* Action-based hover colors */
.btn-start:hover {
    background: #01c3a8;
}

.btn-stop:hover {
    background: #a63d2a;
}

.btn-restart:hover {
    background: #ffb741;
}
</style> 
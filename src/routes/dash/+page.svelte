<script lang="ts">
import VantaBackground from '$lib/components/VantaBackground.svelte';

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
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<VantaBackground 
  vantaType="NET" 
  {vantaConfig}
>
  <div class="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-center text-white mb-8">Dashboard</h1>
  </div>
</VantaBackground> 
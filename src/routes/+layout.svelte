<script>
import '../app.css';
import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</svelte:head>

<div style="display: contents">
  <ThemeToggle />
  <slot />
</div> 
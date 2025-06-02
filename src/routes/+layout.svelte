<script>
import '../app.css';
import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</svelte:head>

<div class="contents">
  <ThemeToggle />
  <slot />
</div> 
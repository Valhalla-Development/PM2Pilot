<script>
import { onMount } from 'svelte';

let isDarkTheme = false;
let _mounted = false;

function _toggleTheme() {
    isDarkTheme = !isDarkTheme;

    if (isDarkTheme) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

onMount(() => {
    isDarkTheme = document.documentElement.classList.contains('dark');
    _mounted = true;
});
</script>

{#if _mounted}
<button 
  class="fixed top-4 right-4 w-12 h-12 rounded-lg p-2 border border-gray-300 dark:border-gray-600 cursor-pointer transition-all duration-200 z-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg" 
  on:click={_toggleTheme}
  aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
>
  {#if isDarkTheme}
    <svg class="w-full h-full fill-yellow-500" viewBox="0 0 20 20">
      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  {:else}
    <svg class="w-full h-full fill-purple-600" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
  {/if}
</button> 
{/if} 
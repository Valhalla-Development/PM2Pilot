<script lang="ts">
import type { VantaEffect } from '$lib/types/vanta';
import { onDestroy, onMount } from 'svelte';
import Loader from './Loader.svelte';

// Props
export let vantaType: string;
export let vantaConfig: Record<string, unknown> = {};
export let loadingDelay = 200;
export let showLoader = true;
export let onloaded: ((effect: VantaEffect | undefined) => void) | undefined = undefined;
export let onerror: ((message: string) => void) | undefined = undefined;

// Internal state
let vantaEffect: VantaEffect | undefined;
let vantaContainer: HTMLDivElement;
let _isLoading = true;

function checkVantaReady(): Promise<void> {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 60;

        const check = () => {
            attempts++;

            const canvas = vantaContainer?.querySelector('canvas');
            const hasValidCanvas = canvas && canvas.width > 0 && canvas.height > 0;

            // Check if Vanta effect has essential properties initialized
            const hasScene = vantaEffect?.scene;
            const hasCamera = vantaEffect?.camera;
            const hasRenderer = vantaEffect?.renderer;

            // Ensure the animation loop has started
            const hasAnimationLoop = vantaEffect?.req;

            if (hasValidCanvas && hasScene && hasCamera && hasRenderer && hasAnimationLoop) {
                // Give it one more frame to ensure first render is complete
                requestAnimationFrame(() => resolve());
            } else if (attempts < maxAttempts) {
                requestAnimationFrame(check);
            } else {
                // Fallback
                resolve();
            }
        };

        requestAnimationFrame(check);
    });
}

onMount(async () => {
    if (typeof window !== 'undefined') {
        await setTimeout(async () => {
            const VANTA = window.VANTA;

            if (VANTA?.[vantaType as keyof typeof VANTA]) {
                try {
                    // Create the effect with the provided config
                    const effectConstructor = VANTA[vantaType as keyof typeof VANTA] as (
                        config: Record<string, unknown> & { el: HTMLElement }
                    ) => VantaEffect;

                    vantaEffect = effectConstructor({
                        el: vantaContainer,
                        ...vantaConfig,
                    });

                    // Wait for Vanta to be ready
                    await checkVantaReady();
                    onloaded?.(vantaEffect);
                } catch (error) {
                    console.error(`Failed to initialize Vanta ${vantaType}:`, error);
                    onerror?.(`Failed to initialize Vanta ${vantaType}`);
                }
            } else {
                console.warn(`VANTA.${vantaType} not available on window`);
                onerror?.(`VANTA.${vantaType} not available`);
            }

            _isLoading = false;
        }, loadingDelay);
    } else {
        _isLoading = false;
    }
});

onDestroy(() => {
    if (vantaEffect) {
        vantaEffect.destroy();
    }
});
</script>

<div class="relative min-h-screen overflow-auto bg-blue-50 dark:bg-gray-900">
  <!-- Vanta.js container -->
  <div 
    bind:this={vantaContainer} 
    class="fixed inset-0 z-0"
  ></div>

  <!-- Loading state -->
  {#if _isLoading && showLoader}
    <div class="relative z-10 h-screen flex items-center justify-center">
      <Loader />
    </div>
  {:else}
    <!-- Content slot -->
    <div class="relative z-10 min-h-screen">
      <slot {vantaEffect} isLoaded={!_isLoading} />
    </div>
  {/if}
</div> 
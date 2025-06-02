<script lang="ts">
import Loader from '$lib/components/Loader.svelte';
import type { VantaEffect } from '$lib/types/vanta';
import { onDestroy, onMount } from 'svelte';

let vantaEffect: VantaEffect | undefined;
let vantaContainer: HTMLDivElement;
let isLoading = true;

function checkVantaReady(): Promise<void> {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 60;

        const check = () => {
            attempts++;

            // More comprehensive checks for Vanta readiness
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
            const VANTA = (window as any).VANTA;

            if (VANTA) {
                vantaEffect = VANTA.WAVES({
                    el: vantaContainer,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x4275,
                    shininess: 34.0,
                    waveHeight: 34.0,
                    waveSpeed: 0.65,
                    zoom: 0.9,
                });

                // Wait for Vanta to be ready
                await checkVantaReady();
            } else {
                console.warn('VANTA not available on window');
            }

            isLoading = false;
        }, 200);
    } else {
        isLoading = false;
    }
});

onDestroy(() => {
    if (vantaEffect) {
        vantaEffect.destroy();
    }
});
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="relative h-screen max-h-[100dvh] bg-blue-50 dark:bg-gray-900 overflow-hidden">
  <!-- Vanta.js container -->
  <div 
    bind:this={vantaContainer} 
    class="absolute inset-0 z-0"
  ></div>

  <!-- Loading state -->
  {#if isLoading}
    <div class="relative z-10 h-full flex items-center justify-center">
      <Loader />
    </div>
  {:else}
    <!-- Login form container -->
    <div class="relative z-10 h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex font-['Montserrat'] items-center justify-center w-full max-w-[400px] mx-auto">
        <div class="flex justify-center items-center w-full">
          <div class="w-full">
            <div class="card card--glass">
              <div class="card__content p-6 sm:p-8 md:p-10">
                <form action="#" method="post" class="space-y-4">
                  <div>
                    <input
                      id="email"
                      class="input-field"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      class="input-field"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    class="btn-scale shadow-lg p-2 rounded-lg w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white mt-6"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
                <div class="flex flex-col mt-6 items-center justify-center text-sm">
                  <h3 class="text-center text-primary">
                    Don't have an account?
                    <a class="group transition-all duration-100 ease-in-out ml-1 font-semibold" href="#">
                      <span class="bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Sign Up
                      </span>
                    </a>
                  </h3>
                </div>
                <!-- Third Party Authentication Options -->
                <div id="third-party-auth" class="flex items-center justify-center mt-5 flex-wrap">
                  <button type="button" aria-label="Sign in with Discord" class="w-10 h-10 flex items-center justify-center hover:scale-125 ease-in-out duration-300 shadow-lg rounded-lg m-1 bg-gray-100 dark:bg-gray-700">
                    <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" class="w-7.5 h-7.5" />
                  </button>
                  <button type="button" aria-label="Sign in with GitHub" class="w-10 h-10 flex items-center justify-center hover:scale-125 ease-in-out duration-300 shadow-lg rounded-lg m-1 bg-gray-100 dark:bg-gray-700">
                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  :root {
    --primary500: hsl(292, 71%, 60%);
    --primary600: hsl(var(--hue-primary), 90%, 60%);
    --white0: hsla(0, 0%, 100%, 0);
    --white50: hsla(0, 0%, 100%, 0.25);
    --white200: hsla(0, 0%, 100%, 0.4);
    --white: hsl(217, 90%, 37%);
  }

  .card {
    --blur: 12px;
    background-image: linear-gradient(90deg, var(--primary600), var(--primary500));
    border-radius: 1em;
    box-shadow: 0 0.25em 0.375em hsla(0, 0%, 0%, 0.1);
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    z-index: 1;
  }

  .card--glass {
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    background-image: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.25)
    );
    color: inherit;
  }

  :global(.dark) .card--glass {
    background-image: linear-gradient(90deg, 
      rgba(26, 26, 26, 0.4),
      rgba(26, 26, 26, 0.25)
    );
  }

  .card--glass:before,
  .card--glass:after {
    border-radius: inherit;
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-width: 8px;
  }

  .card--glass:before {
    border: 8px solid var(--white);
    mask-image: linear-gradient(135deg, var(--white), var(--white0) 50%);
  }

  .card--glass:after {
    border: 8px solid var(--primary500);
    mask-image: linear-gradient(135deg, var(--white0) 50%, var(--white));
  }

  .card__content {
    position: relative;
    z-index: 1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
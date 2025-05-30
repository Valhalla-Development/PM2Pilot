<script lang="ts">
import type { VantaEffect, VantaWindow } from '$lib/types/vanta';
import { onDestroy, onMount } from 'svelte';

let vantaEffect: VantaEffect | undefined;
let vantaContainer: HTMLDivElement;

onMount(() => {
    if (typeof window !== 'undefined') {
        const w = window as unknown as VantaWindow;
        if (w.VANTA) {
            vantaEffect = w.VANTA.WAVES({
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
        }
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

<div class="relative min-h-screen">
  <!-- Vanta.js container -->
  <div 
    bind:this={vantaContainer} 
    class="absolute inset-0 z-0"
  ></div>

  <!-- Login form container -->
  <div class="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="flex font-['Montserrat'] items-center justify-center w-full">
      <div class="flex justify-center items-center w-full">
        <div class="grid gap-8">
          <div class="card card--glass m-4">
            <div class="card__content xl:py-16 2xl:py-16 lg:py-16 md:py-16 sm:py-8 xl:px-10 2xl:px-10 lg:px-10 md:px-10 sm:px-4">
              <form action="#" method="post" class="space-y-4">
                <div>
                  <label for="email" class="mb-2 text-lg" style="color: var(--text-color);">Email</label>
                  <input
                    id="email"
                    class="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 rounded-lg w-full"
                    style="background-color: var(--button-bg); color: var(--text-color); border-color: var(--button-hover);"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label for="password" class="mb-2 text-lg" style="color: var(--text-color);">Password</label>
                  <input
                    id="password"
                    class="border p-3 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 rounded-lg w-full"
                    style="background-color: var(--button-bg); color: var(--text-color); border-color: var(--button-hover);"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  class="shadow-lg p-2 rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white mt-6"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
              <div class="flex flex-col mt-6 items-center justify-center text-sm">
                <h3 style="color: var(--text-color);">
                  Don't have an account?
                  <a class="group transition-all duration-100 ease-in-out" href="#">
                    <span class="bg-left-bottom bg-gradient-to-r bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Sign Up
                    </span>
                  </a>
                </h3>
              </div>
              <!-- Third Party Authentication Options -->
              <div id="third-party-auth" class="flex items-center justify-center mt-5 flex-wrap">
                <button type="button" aria-label="Sign in with Discord" class="w-10 h-10 flex items-center justify-center hover:scale-125 ease-in-out duration-300 shadow-lg rounded-lg m-1" style="background-color: var(--button-bg);">
                  <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" class="w-7.5 h-7.5" />
                </button>
                <button type="button" aria-label="Sign in with GitHub" class="w-10 h-10 flex items-center justify-center hover:scale-125 ease-in-out duration-300 shadow-lg rounded-lg m-1" style="background-color: var(--button-bg);">
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

  /* Make links and spans bold */
  a.group span {
    font-weight: 600;
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
      color-mix(in srgb, var(--bg-color) 40%, transparent),
      color-mix(in srgb, var(--bg-color) 25%, transparent)
    );
    color: inherit;
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
</style>
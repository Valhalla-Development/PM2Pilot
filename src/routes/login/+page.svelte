<script lang="ts">
import LiquidGlass from '$lib/components/LiquidGlass.svelte';
import VantaBackground from '$lib/components/VantaBackground.svelte';

const vantaConfig = {
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
};
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<VantaBackground 
  vantaType="WAVES" 
  {vantaConfig}
>
  <div class="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="flex font-['Montserrat'] items-center justify-center w-full max-w-[400px] mx-auto">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <LiquidGlass style="max-width: 500px; width: 100%; flex-direction: column;">
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
              <div class="relative inline-flex items-center justify-center w-full mt-6">
                <div
                  class="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                ></div>
                <button
                  type="submit"
                  class="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 px-8 py-2.5 text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-blue-500/30 w-full text-base"
                >
                  Sign in
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="12"
                    width="12"
                    fill="none"
                    class="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      class="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      class="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
            <div class="flex flex-col mt-6 items-center justify-center text-sm">
              <h3 class="text-center text-primary font-medium">
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
          </LiquidGlass>
        </div>
      </div>
    </div>
  </div>
</VantaBackground>
<script lang="ts">
import GlassCard from '$lib/components/GlassCard.svelte';
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
          <GlassCard maxWidth="500px">
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
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
</VantaBackground>
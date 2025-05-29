<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style="background-color: var(--bg-color);">
  <div class="flex font-['Montserrat'] items-center justify-center">
    <div class="h-screen w-screen flex justify-center items-center">
        <div class="grid gap-8">
            <div id="back-div" class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                <div class="border-[20px] border-transparent rounded-[20px] shadow-lg xl:py-16 2xl:py-16 lg:py-16 md:py-16 sm:py-8 xl:px-10 2xl:px-10 lg:px-10 md:px-10 sm:px-4 m-2" style="background-color: var(--bg-color);">
                    
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
                        <a class="group transition-all duration-100 ease-in-out mb-4 block" href="#">
                            <span class="bg-left-bottom bg-gradient-to-r text-sm bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                Forget your password?
                            </span>
                        </a>
                        <button
                            class="shadow-lg p-2 rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white"
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
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	// Core plugins required for the project
	plugins: [
		sveltekit(),
		tailwindcss(),
	],

	// Development server configuration
	server: {
		port: 4173,
		// If true, will fail if port is in use instead of trying another port
		strictPort: true,
		// Add your domain here
		allowedHosts: ['your-app.example.com'],
		// HMR (Hot Module Replacement) settings for HTTPS
		hmr: {
			clientPort: 443,
			protocol: 'https'
		}
	},

	// Production preview server configuration
	preview: {
		// Should match your development port
		port: 5173,
		// If true, will fail if port is in use
		strictPort: true,
		// Set to true to allow external access
		host: true,
		allowedHosts: ['your-app.example.com']
	}
});

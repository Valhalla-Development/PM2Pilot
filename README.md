# PM2Pilot 🚀

A self-hosted, modern web interface for managing PM2 processes. Built with SvelteKit, TypeScript, and Tailwind CSS, PM2Pilot is designed to be deployed on your own infrastructure - perfect for managing PM2 applications on any environment where you need a beautiful, intuitive interface for PM2.

## ⚠️ Early Development Notice

This project is in its very early stages. Currently, only the UI framework and basic infrastructure are in place. The login page is purely visual with no authentication functionality yet. This repository is primarily for developers interested in contributing to or following the project's development.

## 🎯 Project Goals

- 🎨 Modern, responsive interface for managing PM2 processes
- 🔄 Real-time monitoring and control of your PM2 processes
- 🛡️ Secure access to your server's processes

## 🎯 Current Status

🚧 **Active Development** 🚧

What's implemented:
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Visual login interface (UI only, no functionality)
- ✅ Vanta.js background effects
- ✅ TypeScript integration
- ✅ Basic PM2 client connection structure

What's coming next:
- ⏳ Login functionality
- ⏳ Process management features
- ⏳ Real-time monitoring
- ⏳ User authentication
- ⏳ Dashboard implementation

## 🛠️ Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Full-stack framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vanta.js](https://www.vantajs.com/) - Interactive backgrounds
- [PM2](https://pm2.keymetrics.io/) - Process management
- [Biome](https://biomejs.dev/) - Linting and formatting

## 🚀 For Developers

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js
- PM2 installed globally (`npm install -g pm2`)
- Basic understanding of SvelteKit and TypeScript

### Development Setup

If you're interested in contributing or following the development:

1. Clone the repository:
   ```bash
   git clone https://github.com/Valhalla-Development/PM2Pilot.git
   cd PM2Pilot
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure your development environment:
   - Update `vite.config.ts` with your domain and port settings
   - Make sure PM2 is running locally

4. Start the development server:
   ```bash
   bun run dev
   ```

## 🔧 Configuration

The project uses Vite for configuration. Key settings can be found in `vite.config.ts`:

```typescript
// Development server
server: {
    port: 4173,              // Change if needed
    strictPort: true,        // Fails if port is in use
    allowedHosts: ['your-app.example.com'],  // Add your domain
    hmr: {
        clientPort: 443,     // HTTPS port
        protocol: 'https'    // Use 'http' if not using HTTPS
    }
}

// Production preview
preview: {
    port: 5173,             // Preview server port
    strictPort: true,
    host: true,             // Allow external access
    allowedHosts: ['your-app.example.com']
}
```

## 🤝 Contributing

We're actively looking for contributors to help shape this project! Areas where we need help:

- 🔐 Authentication implementation
- 📊 Dashboard design and functionality
- 🔄 PM2 process management features
- 🎨 UI/UX improvements
- 📝 Documentation
- 🐛 Bug reporting

Please feel free to:
- Open an issue to discuss features or bugs
- Submit a pull request
- Join our development discussions

## 📝 License

This project is licensed under the GPL-3.0-or-later License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PM2](https://pm2.keymetrics.io/) for the amazing process manager
- [Vanta.js](https://www.vantajs.com/) for the beautiful background effects
- The SvelteKit and Tailwind CSS communities for their excellent documentation

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Valhalla-Development">Valhalla Development</a>
</div>
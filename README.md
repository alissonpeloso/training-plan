# Training Plan App

A scientific workout tracking application for a 4-day hypertrophy training program.

## Features

- 4-day workout split with detailed exercises
- Track daily progress and completed exercises
- Science-based training principles
- Responsive mobile-first design
- Built with React and Tailwind CSS

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This app is automatically deployed to GitHub Pages using GitHub Actions. Any push to the `main` branch triggers a new deployment.

The deployment workflow:
1. Checks out the code
2. Installs dependencies
3. Builds the production version
4. Deploys to GitHub Pages

## GitHub Pages Configuration

To enable GitHub Pages for this repository:

1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy on pushes to `main`

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GitHub Actions** - CI/CD for deployment
- **GitHub Pages** - Static site hosting

## License

MIT

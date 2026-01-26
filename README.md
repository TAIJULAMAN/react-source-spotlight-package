# React Source Spotlight

> **Turn your portfolio into an interactive code showcase. Let recruiters explore your implementation without leaving the page.**

A production-ready NPM package designed specifically for **job seekers** and developers who want to showcase their React code directly in their portfolios. Add a "Developer Mode" toggle that reveals component source code on hover—no GitHub navigation required.

![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)

##  Why Use This?

**The Problem**: Recruiters want to see your code, but navigating GitHub repositories is time-consuming and breaks the portfolio experience.

**The Solution**: Let them explore your implementation directly in your portfolio with a single click.

### Key Features

- 🎨 **Premium UI** - Glassmorphism design with smooth animations that wow recruiters
- 📋 **One-Click Copy** - Recruiters can instantly copy code to test in their own environment
- ✨ **Clean Code Badge** - Automatically highlights modular components (<100 lines) to showcase best practices
- 🔗 **GitHub Deep Links** - Direct links to source files for full context
- ⌨️ **Keyboard Shortcuts** - `Ctrl+Shift+D` to toggle Developer Mode
- 🎯 **Zero Config** - Works out of the box with sensible defaults
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- 🌙 **Syntax Highlighting** - Professional code display with Night Owl theme
- 🚀 **Framework Agnostic** - Works with Next.js, Vite, Create React App, and more
- 🔒 **Production Safe** - Only shows code you explicitly wrap with `<Spotlight>`

## 🚀 Quick Start

Get up and running in **5 minutes**:

### Step 1: Install the Package

```bash
npm install react-source-spotlight
# or
yarn add react-source-spotlight
# or
pnpm add react-source-spotlight
```

### Step 2: Configure Build Script

Add the source map generator to your build process in `package.json`:

```json
{
  "scripts": {
    "prebuild": "spotlight generate",
    "build": "npm run prebuild && next build"
  }
}
```

### 3. Wrap Your App

```tsx
// _app.tsx (Next.js) or App.tsx (Vite/CRA)
import { SpotlightProvider, DevModeToggle } from 'react-source-spotlight';
import 'react-source-spotlight/dist/spotlight.css';

export default function App({ Component, pageProps }) {
  return (
    <SpotlightProvider repoUrl="https://github.com/username/repo">
      <Component {...pageProps} />
      <DevModeToggle />
    </SpotlightProvider>
  );
}
```

### 4. Wrap Components You Want to Showcase

```tsx
import { Spotlight } from 'react-source-spotlight';

export default function HomePage() {
  return (
    <>
      <Spotlight filename="src/components/Hero.tsx">
        <Hero />
      </Spotlight>

      <Spotlight filename="src/components/Projects.tsx">
        <Projects />
      </Spotlight>

      <Spotlight filename="src/components/Contact.tsx">
        <Contact />
      </Spotlight>
    </>
  );
}
```

### 5. Generate Source Map

Run the build command:

```bash
npm run build
```

The CLI will scan your components and generate `public/spotlight-map.json`.

---

##  How It Works

### Before (Regular Portfolio)
```
Your beautiful portfolio → Recruiter sees UI → Wants to see code → 
Opens GitHub → Searches for file → Loses context
```

### After (With React Source Spotlight)
```
Your beautiful portfolio → Recruiter clicks "View Code" → 
Hovers over component → Sees code instantly → Impressed! 🎉
```

### Visual Flow

1. **Floating Toggle Button** appears in corner of your portfolio
2. **Hover Effect** shows neon green outline around wrapped components
3. **Click Component** opens beautiful modal with syntax-highlighted code
4. **Copy or View on GitHub** with one click

---

##  Configuration

Create a `spotlight.config.js` file in your project root:

```javascript
module.exports = {
  // Input pattern for component files
  input: './src/components/**/*.{tsx,jsx}',
  
  // Output path for generated source map
  output: './public/spotlight-map.json',
  
  // Files to exclude
  exclude: ['**/*.test.*', '**/*.spec.*'],
  
  // Your GitHub repository URL
  repoUrl: 'https://github.com/TAIJULAMAN/react-source-spotlight-package',
  
  // Feature flags
  features: {
    cleanCodeBadge: { threshold: 100 },
    githubLinks: true,
    copyButton: true,
  },
};
```

## Component API

### `<SpotlightProvider>`

Wraps your entire application and provides context.

```tsx
<SpotlightProvider
  mapUrl="/spotlight-map.json"  // URL to source map
  repoUrl="https://github.com/TAIJULAMAN/react-source-spotlight-package"  // GitHub repo URL
  theme="dark"  // 'dark' | 'light'
>
  {children}
</SpotlightProvider>
```

### `<Spotlight>`

Wraps individual components you want to showcase.

```tsx
<Spotlight filename="src/components/Hero.tsx">
  <Hero />
</Spotlight>
```

### `<DevModeToggle>`

Floating button to toggle Developer Mode.

```tsx
<DevModeToggle position="bottom-right" />
// Positions: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
```

### `useSourceSpotlight()` Hook

Programmatic access to spotlight functionality.

```tsx
import { useSourceSpotlight } from 'react-source-spotlight';

function MyComponent() {
  const {
    isDevMode,
    toggleDevMode,
    enableDevMode,
    disableDevMode,
    getSourceCode,
    sourceMap,
    hasSourceMap,
  } = useSourceSpotlight();

  return (
    <button onClick={toggleDevMode}>
      {isDevMode ? 'Hide' : 'Show'} Code
    </button>
  );
}
```

## Perfect For

### Job Seekers 
Stand out from other candidates by letting recruiters see your code quality **instantly**. No more "check my GitHub" links that never get clicked.

### Frontend Developers 
Build a portfolio that demonstrates not just what you built, but **how** you built it. Show off your clean code, component architecture, and best practices.

### Freelancers 
Win more clients by showcasing your implementation skills directly in your portfolio. Let potential clients see the quality of your work before they even contact you.

### Open Source Contributors 
Make your personal projects more accessible. Let visitors explore your code without leaving your project showcase page.

## Framework Integration

### Next.js

```json
{
  "scripts": {
    "prebuild": "spotlight generate",
    "build": "npm run prebuild && next build"
  }
}
```

### Vite

```json
{
  "scripts": {
    "prebuild": "spotlight generate",
    "build": "npm run prebuild && vite build"
  }
}
```

### Create React App

```json
{
  "scripts": {
    "prebuild": "spotlight generate",
    "build": "npm run prebuild && react-scripts build"
  }
}
```

## CLI Commands

### Generate Source Map

```bash
spotlight generate
```

Options:
- `-c, --config <path>` - Config file path (default: `spotlight.config.js`)
- `-o, --output <path>` - Output path for JSON map
- `-i, --input <pattern>` - Input glob pattern for components

## Examples

Check out the `examples/` directory for complete working examples:

- **Next.js Portfolio** - Full portfolio with multiple components
- **Vite React App** - Simple Vite setup
- **Create React App** - Basic CRA integration

## Important Notes

### Security

- All wrapped component source code will be publicly accessible
- Never include API keys, secrets, or sensitive logic in showcased components
- Use the `exclude` option to skip sensitive files

### Bundle Size

- The source map JSON is included in your production bundle
- For large portfolios, consider excluding large files
- Typical overhead: 10-50 KB gzipped for most portfolios

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Works on mobile devices

## See It In Action

Once installed, your portfolio visitors can:

1. **Click the floating "View Code" button** to enable Developer Mode
2. **Hover over any wrapped component** to see a neon highlight
3. **Click the component** to open a beautiful modal with:
   - Full source code with syntax highlighting  
   - File metadata (lines, size)
   - Clean Code Badge (for well-structured components)
   - One-click copy button
   - Direct GitHub link

**Keyboard shortcut**: Press `Ctrl+Shift+D` to toggle Developer Mode on/off

## What Gets Included in Your Bundle?

- **Package size**: ~50 KB gzipped (includes Prism syntax highlighter)
- **Source map**: Varies based on how many components you showcase (typically 10-30 KB)
- **Performance impact**: Zero when Developer Mode is off
- **SEO impact**: None (source map loads asynchronously)

## Important Security Notes

### What This Package Does
- ✅ Only exposes source code for components you **explicitly wrap** with `<Spotlight>`
- ✅ Source map is generated at **build time**, not runtime
- ✅ No access to your file system or environment variables

### Best Practices
- ❌ **Never wrap components** containing API keys, secrets, or sensitive business logic
- ✅ **Only showcase** UI components, layouts, and presentational code
- ✅ **Use the `exclude` option** in config to skip sensitive files
- ✅ **Review the generated** `spotlight-map.json` before deploying

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/TAIJULAMAN/react-source-spotlight-package/issues) if you want to contribute.

## License

MIT © 2026 React Source Spotlight

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) for beautiful syntax highlighting
- Inspired by the need to make portfolio code more accessible to recruiters
- Designed specifically for the job-seeking developer community

---

<div align="center">

**Made with ❤️ for job seekers and developers**

If this package helped you land a job or impress a client, [give it a star ⭐](https://github.com/TAIJULAMAN/react-source-spotlight-package)

[Report Bug](https://github.com/TAIJULAMAN/react-source-spotlight-package/issues) · [Request Feature](https://github.com/TAIJULAMAN/react-source-spotlight-package/issues) · [Documentation](https://github.com/TAIJULAMAN/react-source-spotlight-package#readme)

</div>

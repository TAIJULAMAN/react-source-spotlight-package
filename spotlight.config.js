/**
 * Example configuration file for React Source Spotlight
 * Copy this to your project root and customize as needed
 */
module.exports = {
    // Input pattern for component files
    input: './src/components/**/*.{tsx,jsx}',

    // Output path for generated source map
    output: './public/spotlight-map.json',

    // Files to exclude from scanning
    exclude: [
        '**/*.test.*',
        '**/*.spec.*',
        '**/node_modules/**',
        '**/__tests__/**',
    ],

    // Your GitHub repository URL (for "View on GitHub" links)
    repoUrl: 'https://github.com/username/repo',

    // Feature flags
    features: {
        // Clean Code Badge - shows badge for components under threshold
        cleanCodeBadge: {
            threshold: 100, // lines of code
        },

        // Enable GitHub deep links
        githubLinks: true,

        // Enable copy-to-clipboard button
        copyButton: true,
    },
};

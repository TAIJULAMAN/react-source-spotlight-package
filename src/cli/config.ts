import * as fs from 'fs';
import * as path from 'path';
import { SpotlightConfig } from '../types';

const DEFAULT_CONFIG: SpotlightConfig = {
    input: './src/components/**/*.{tsx,jsx}',
    output: './public/spotlight-map.json',
    exclude: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'],
    features: {
        cleanCodeBadge: { threshold: 100 },
        githubLinks: true,
        copyButton: true,
    },
};

export function loadConfig(configPath: string): SpotlightConfig {
    const resolvedPath = path.resolve(process.cwd(), configPath);

    // Check if config file exists
    if (fs.existsSync(resolvedPath)) {
        try {
            // Clear require cache to get fresh config
            delete require.cache[require.resolve(resolvedPath)];
            const userConfig = require(resolvedPath);

            // Merge with defaults
            return {
                ...DEFAULT_CONFIG,
                ...userConfig,
                features: {
                    ...DEFAULT_CONFIG.features,
                    ...userConfig.features,
                },
            };
        } catch (error) {
            console.warn(
                `Warning: Could not load config from ${configPath}, using defaults`
            );
            return DEFAULT_CONFIG;
        }
    }

    // Return defaults if no config file
    return DEFAULT_CONFIG;
}

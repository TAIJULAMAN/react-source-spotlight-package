import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SpotlightContextType, SourceData } from './types';

export const SpotlightContext = createContext<SpotlightContextType | null>(
    null
);

interface SpotlightProviderProps {
    children: ReactNode;
    mapUrl?: string;
    repoUrl?: string;
    theme?: 'light' | 'dark';
}

export function SpotlightProvider({
    children,
    mapUrl = '/spotlight-map.json',
    repoUrl,
    theme = 'dark',
}: SpotlightProviderProps) {
    const [isDevMode, setIsDevMode] = useState(false);
    const [sourceMap, setSourceMap] = useState<Record<string, SourceData>>({});

    // Load source map on mount
    useEffect(() => {
        fetch(mapUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to load source map: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setSourceMap(data);
                console.log(
                    `[Spotlight] Loaded ${Object.keys(data).length} component sources`
                );
            })
            .catch(err => {
                console.warn('[Spotlight] Source map not found:', err.message);
                console.warn(
                    '[Spotlight] Make sure to run "spotlight generate" before building'
                );
            });
    }, [mapUrl]);

    // Keyboard shortcut (Ctrl+Shift+D)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                setIsDevMode(prev => {
                    console.log(`[Spotlight] Dev mode ${!prev ? 'ON' : 'OFF'}`);
                    return !prev;
                });
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const contextValue: SpotlightContextType = {
        isDevMode,
        setIsDevMode,
        sourceMap,
        repoUrl,
        theme,
    };

    return (
        <SpotlightContext.Provider value={contextValue}>
            {children}
        </SpotlightContext.Provider>
    );
}

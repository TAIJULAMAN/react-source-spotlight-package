import { useContext } from 'react';
import { SpotlightContext } from '../SpotlightProvider';
import { SourceData } from '../types';

export function useSourceSpotlight() {
    const context = useContext(SpotlightContext);

    if (!context) {
        throw new Error(
            'useSourceSpotlight must be used within a SpotlightProvider'
        );
    }

    return {
        isDevMode: context.isDevMode,
        toggleDevMode: () => context.setIsDevMode(!context.isDevMode),
        enableDevMode: () => context.setIsDevMode(true),
        disableDevMode: () => context.setIsDevMode(false),
        getSourceCode: (filename: string): SourceData | undefined =>
            context.sourceMap[filename],
        sourceMap: context.sourceMap,
        hasSourceMap: Object.keys(context.sourceMap).length > 0,
    };
}

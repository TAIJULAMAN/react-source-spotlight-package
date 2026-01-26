import React, { useContext } from 'react';
import { SpotlightContext } from '../SpotlightProvider';

interface DevModeToggleProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function DevModeToggle({
    position = 'bottom-right',
}: DevModeToggleProps) {
    const context = useContext(SpotlightContext);

    if (!context) {
        console.warn('[Spotlight] DevModeToggle must be used within SpotlightProvider');
        return null;
    }

    const { isDevMode, setIsDevMode } = context;

    return (
        <button
            className={`spotlight-toggle spotlight-toggle-${position}`}
            onClick={() => setIsDevMode(!isDevMode)}
            aria-label={isDevMode ? 'Disable Developer Mode' : 'Enable Developer Mode'}
            title={`${isDevMode ? 'Disable' : 'Enable'} Developer Mode (Ctrl+Shift+D)`}
        >
            {isDevMode ? '👨‍💻 Dev Mode ON' : '👁️ View Code'}
        </button>
    );
}

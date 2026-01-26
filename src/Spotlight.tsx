import React, { useState, useContext, ReactNode } from 'react';
import { SpotlightContext } from './SpotlightProvider';
import { CodeModal } from './components/CodeModal';

interface SpotlightProps {
    filename: string;
    children: ReactNode;
}

export function Spotlight({ filename, children }: SpotlightProps) {
    const context = useContext(SpotlightContext);
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // If context is not available or DevMode is OFF, render normally
    if (!context || !context.isDevMode) {
        return <>{children}</>;
    }

    const { sourceMap } = context;
    const sourceData = sourceMap[filename];

    // Warn if source data not found
    if (!sourceData && isHovered) {
        console.warn(`[Spotlight] No source data found for: ${filename}`);
    }

    return (
        <>
            <div
                className="spotlight-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                    if (sourceData) {
                        setShowModal(true);
                    }
                }}
                style={{
                    position: 'relative',
                    outline: isHovered ? '2px dashed #00ff88' : 'none',
                    outlineOffset: '4px',
                    cursor: isHovered && sourceData ? 'pointer' : 'default',
                    transition: 'outline 0.2s ease',
                }}
            >
                {children}

                {/* Hover Badge */}
                {isHovered && (
                    <div className="spotlight-badge">
                        📄 {filename}
                        {!sourceData && ' (not found)'}
                    </div>
                )}
            </div>

            {/* Code Modal */}
            {showModal && sourceData && (
                <CodeModal
                    filename={filename}
                    sourceData={sourceData}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

import React, { useContext, useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { SpotlightContext } from '../SpotlightProvider';
import { SourceData } from '../types';

interface CodeModalProps {
    filename: string;
    sourceData: SourceData;
    onClose: () => void;
}

export function CodeModal({ filename, sourceData, onClose }: CodeModalProps) {
    const context = useContext(SpotlightContext);
    const [copied, setCopied] = useState(false);

    if (!context) return null;

    const { repoUrl, theme } = context;

    // Close on ESC key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(sourceData.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('[Spotlight] Failed to copy:', error);
        }
    };

    const isCleanCode = sourceData.lines < 100;

    // Determine file extension for syntax highlighting
    const getLanguage = (filename: string): string => {
        if (filename.endsWith('.tsx')) return 'tsx';
        if (filename.endsWith('.ts')) return 'typescript';
        if (filename.endsWith('.jsx')) return 'jsx';
        return 'javascript';
    };

    return (
        <div className="spotlight-modal-backdrop" onClick={onClose}>
            <div
                className="spotlight-modal"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="spotlight-modal-header">
                    <div className="spotlight-modal-title">
                        <h3>{filename}</h3>
                        <p className="spotlight-modal-meta">
                            {sourceData.lines} lines · {(sourceData.size / 1024).toFixed(1)}{' '}
                            KB
                        </p>
                    </div>

                    <div className="spotlight-modal-header-actions">
                        {/* Clean Code Badge */}
                        {isCleanCode && (
                            <span className="clean-code-badge">✨ Clean & Modular</span>
                        )}

                        <button
                            className="spotlight-modal-close"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="spotlight-actions">
                    {/* Copy Button */}
                    <button
                        className="spotlight-action-btn"
                        onClick={copyToClipboard}
                        disabled={copied}
                    >
                        {copied ? '✓ Copied!' : '📋 Copy Code'}
                    </button>

                    {/* GitHub Link */}
                    {repoUrl && (
                        <a
                            href={`${repoUrl}/blob/main/${filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="spotlight-action-btn spotlight-action-link"
                        >
                            🔗 View on GitHub
                        </a>
                    )}
                </div>

                {/* Code Display */}
                <div className="spotlight-code-container">
                    <Highlight
                        theme={theme === 'dark' ? themes.nightOwl : themes.github}
                        code={sourceData.code}
                        language={getLanguage(filename)}
                    >
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <pre style={style} className="spotlight-code-pre">
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        <span className="line-number">{i + 1}</span>
                                        <span className="line-content">
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>
            </div>
        </div>
    );
}

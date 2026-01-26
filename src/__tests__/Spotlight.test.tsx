import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spotlight } from '../Spotlight';
import { SpotlightProvider } from '../SpotlightProvider';

describe('Spotlight Component', () => {
    it('renders children when dev mode is off', () => {
        render(
            <SpotlightProvider>
                <Spotlight filename="Test.tsx">
                    <div>Test Component</div>
                </Spotlight>
            </SpotlightProvider>
        );

        expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('renders without SpotlightProvider', () => {
        render(
            <Spotlight filename="Test.tsx">
                <div>Test Component</div>
            </Spotlight>
        );

        expect(screen.getByText('Test Component')).toBeInTheDocument();
    });
});

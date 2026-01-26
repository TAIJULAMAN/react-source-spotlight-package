export interface SourceData {
    code: string;
    lines: number;
    size: number;
    lastModified: Date;
}

export interface SpotlightContextType {
    isDevMode: boolean;
    setIsDevMode: (value: boolean) => void;
    sourceMap: Record<string, SourceData>;
    repoUrl?: string;
    theme: 'light' | 'dark';
}

export interface SpotlightConfig {
    input: string;
    output: string;
    exclude?: string[];
    repoUrl?: string;
    features?: {
        cleanCodeBadge?: { threshold: number };
        githubLinks?: boolean;
        copyButton?: boolean;
    };
}

export interface SpotlightProviderProps {
    children: React.ReactNode;
    mapUrl?: string;
    repoUrl?: string;
    theme?: 'light' | 'dark';
}

export interface SpotlightProps {
    filename: string;
    children: React.ReactNode;
}

export interface DevModeToggleProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface CodeModalProps {
    filename: string;
    sourceData: SourceData;
    onClose: () => void;
}

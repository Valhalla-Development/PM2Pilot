export interface VantaConfig {
    el: HTMLElement;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    color: number;
    shininess: number;
    waveHeight: number;
    waveSpeed: number;
    zoom: number;
}

export interface VantaEffect {
    destroy: () => void;
    scene?: unknown;
    camera?: unknown;
    renderer?: unknown;
    req?: number;
}

export interface VantaWavesConfig {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
}

export type VantaWaves = (config: VantaConfig) => VantaEffect;

export interface VantaGlobal {
    WAVES: (config: VantaWavesConfig) => VantaEffect;
}

declare global {
    interface Window {
        VANTA: VantaGlobal;
    }
}

export interface VantaWindow extends Window {
    VANTA: VantaGlobal;
}

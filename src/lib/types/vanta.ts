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

export type VantaWaves = (config: VantaConfig) => VantaEffect;

export interface VantaGlobal {
    WAVES: VantaWaves;
}

export interface VantaWindow extends Window {
    VANTA: VantaGlobal;
}

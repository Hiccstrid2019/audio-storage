declare module '*.css' {
    const content: {
        [className: string]: string;
    }
    export = content
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare interface Window {
    webkitAudioContext: typeof AudioContext;
}

export {};



declare global {
  interface Window {
    bootstrap: unknown;
    
  }

  type TooltipConstructor = new (element: HTMLElement) => void;

}

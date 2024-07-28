// src/types/MicroFrontend.ts

/**
 * @name MicroFrontend
 * @description
 * Defines a clear interface or contract that all the micro-frontends will follow.
 * This contract ensures consistency in how micro-frontends are loaded, initialized,
 * and communicated with, regardless of the framework they're built with.
 */
export interface MicroFrontend {
  mount: (containerId: string) => Promise<void>
  unmount?: (containerId: string) => void
}

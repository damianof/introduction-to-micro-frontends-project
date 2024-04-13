// src/utils/useLoadScript.ts

// cache to avoid loading the same scripts more than once:
const loadedScripts: Set<string> = new Set()

export const useLoadScript = () => {
  return {
    /**
     * @name loadScript
     * @description
     * Create a utility function in TypeScript for dynamically loading JavaScript files.
     * This utility will be used to load the compiled micro-frontend bundles at runtime.
     */
    loadScript: (url: string) => new Promise<boolean>((resolve, reject) => {
      // Check if the script has already been loaded
      if (loadedScripts.has(url)) {
        // console.log(`Script already loaded: ${url}`);
        resolve(false);
        return;
      }
      
      const script = document.createElement('script')
      script.type = 'module'
      script.src = url
      script.async = true
      script.onload = () => {
        // console.log(`Script loaded: ${url}`)
        loadedScripts.add(url) // Add the script URL to the cache
        resolve(true)
      };
      script.onerror = (error) => {
        console.error(`Error loading script: ${url}`, error)
        reject(error)
      }
      document.head.appendChild(script)
    })
  }
}

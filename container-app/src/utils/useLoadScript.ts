// src/utils/useLoadScript.ts

// cache to avoid loading the same scripts more than once:
const loadedScripts: Set<string> = new Set()

export const useLoadScript = () => {
  const instance = {
    /**
     * @name loadScript
     * @description
     * Create a utility function in TypeScript for dynamically loading JavaScript files.
     * This utility will be used to load the compiled micro-frontend bundles at runtime.
     */
    loadScript: (url: string, moduleKey: string) =>
      new Promise<boolean>((resolve, reject) => {
        // Check if the script has already been loaded
        if (loadedScripts.has(moduleKey)) {
          console.log(`Script already loaded: ${moduleKey}: ${url}`)
          resolve(false)
          return
        }

        // append a random value to avoid caching
        const nocacheUrl = url.indexOf('?') === -1 ? `${url}?${Math.random()}` : `${url}&${Math.random()}`

        const script = document.createElement('script')
        script.id = moduleKey
        script.type = 'module'
        script.src = nocacheUrl
        script.async = true
        script.onload = () => {
          // console.log(`Script loaded: ${url}`)
          loadedScripts.add(moduleKey) // Add the moduleKey to the cache
          resolve(true)
        }
        script.onerror = (error) => {
          console.error(`Error loading script: ${url}`, error)
          reject(error)
        }
        document.head.appendChild(script)
      }),

    unloadScript: async (moduleKey: string) => {
      // Check if the script has already been loaded
      if (loadedScripts.has(moduleKey)) {
        loadedScripts.delete(moduleKey)
      }
      const node = document.getElementById(moduleKey)
      if (node) {
        document.head.removeChild(node)
      }
      return true
    },

    reloadScript: async (url: string, moduleKey: string) => {
      // Check if the script has already been loaded
      await instance.unloadScript(moduleKey)
      return instance.loadScript(url, moduleKey)
    },
  }
  return instance
}

// src/utils/useLoadScript.ts

const LOAD_SCRIPT_MAX_RETRIES = 10
const LOAD_SCRIPT_RETRY_DELAY_MS = 2000

// cache to avoid loading the same scripts more than once:
const loadedScripts: Set<string> = new Set()

export const useLoadScript = () => {
  const instance = {
    /**
     * @name loadScript
     * @description
     * Dynamically loads a JavaScript module bundle by injecting a <script type="module">
     * tag. Retries up to LOAD_SCRIPT_MAX_RETRIES times with a fixed delay between
     * attempts — this handles the startup race where micro-frontend builds may not
     * be ready the first time the container-app mounts.
     */
    loadScript: (url: string, moduleKey: string) =>
      new Promise<boolean>((resolve, reject) => {
        if (loadedScripts.has(moduleKey)) {
          resolve(false)
          return
        }

        let attempt = 0

        const tryLoad = () => {
          // Guard: abort if another path (e.g. HMR reload) already loaded this module
          if (loadedScripts.has(moduleKey)) {
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
            loadedScripts.add(moduleKey)
            resolve(true)
          }
          script.onerror = (error) => {
            const node = document.getElementById(moduleKey)
            if (node) {
              document.head.removeChild(node)
            }
            if (attempt < LOAD_SCRIPT_MAX_RETRIES) {
              attempt++
              console.warn(`useLoadScript: failed to load "${url}", retrying (${attempt}/${LOAD_SCRIPT_MAX_RETRIES})...`)
              setTimeout(tryLoad, LOAD_SCRIPT_RETRY_DELAY_MS)
            } else {
              console.error(`useLoadScript: gave up loading "${url}" after ${LOAD_SCRIPT_MAX_RETRIES} retries.`, error)
              reject(error)
            }
          }
          document.head.appendChild(script)
        }

        tryLoad()
      }),

    isLoaded: (moduleKey: string) => loadedScripts.has(moduleKey),

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

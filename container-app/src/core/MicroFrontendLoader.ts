// file: container-app/src/core/MicroFrontendLoader.ts

import { MicroFrontend } from '../types'
import { useLoadScript } from '../utils'

/**
 * @description
 * Implement a class or module that handles the lifecycle of micro-frontends, 
 * including loading, mounting, and unmounting them. 
 * This component will use the loadScript utility 
 * and ensure micro-frontends adhere to the defined interface.
 */
class MicroFrontendLoader {
  async loadAndMount(url: string, containerId: string): Promise<void> {
    const { loadScript } = useLoadScript()
    const wasLoaded = await loadScript(url)

    // Proceed to mount only if the script was loaded for the first time
    if (wasLoaded) {
      // Extract the module name from the URL, assuming it's the segment before `/assets/index.js`
      const moduleName = url.split('/').slice(-3, -2)[0]; // Extracts the segment before `/assets/index.js`
      // console.log('moduleName', moduleName)
      // console.log('containerId', containerId)

      const microFrontend: MicroFrontend = (window as any)[moduleName]

      if (microFrontend && microFrontend.mount) {
        await microFrontend.mount(containerId)
      } else {
        console.error('Micro-Frontend is undefined or does not follow the correct interface.')
      }
    }
  }

  unmount(containerId: string, microFrontend: MicroFrontend): void {
    microFrontend.unmount?.(containerId)
  }
}

const microFrontendLoader = new MicroFrontendLoader()

export const useMicroFrontendLoader = () => {
  return microFrontendLoader
}

import { Plugin } from 'vite'
import chokidar from 'chokidar'

type TWatcher = ReturnType<typeof chokidar.watch>
let _watcherInstance: TWatcher = undefined as any
let _onInstance: TWatcher = undefined as any

const allowedKeys = ['microfrontend1', 'microfrontend2', 'microfrontend3', 'root-styles']
const rx = /^..\/([^\/]+)+/g

export function WatchBuildsAndNotifyPlugin(): Plugin {
  return {
    name: 'watch-builds-and-notify',
    configureServer(server) {
      if (!_watcherInstance && !_onInstance) {
        // Setup chokidar to watch the `dist` directory
        const _watcherInstance: TWatcher = chokidar.watch(
          [
            '../microfrontend1/microfrontend1',
            '../microfrontend2/microfrontend2',
            '../microfrontend3/microfrontend3',
            '../root-styles/dist',
          ],
          { ignoreInitial: true },
        )

        const handler = (event: any, path: string) => {
          const matches = path.match(rx)
          const key = `${(matches && matches[0]) || 'unknown'}`.replace('../', '')
          // send event to client
          if (allowedKeys.indexOf(key) > -1) {
            console.log(`watch-builds-and-notify: detected ${event} in (${key}) path ${path}`)
            // Use Vite's HMR API to send a custom event
            server.hot.send({
              type: 'custom',
              event: 'module-change', // Custom event type
              data: { key, event, path },
            })
          }
        }

        _onInstance = _watcherInstance.on('all', handler)

        return () => {
          // if (_onInstance) {
          //   console.log("Cleaning up _onInstance ...");
          //   _onInstance.close()
          //   _onInstance = undefined as any
          // }
          // if (_watcherInstance) {
          //   console.log("Cleaning up _watcherInstance...");
          //   _watcherInstance.close()
          //   _watcherInstance = undefined as any
          // }
        }
      }
    },
  }
}

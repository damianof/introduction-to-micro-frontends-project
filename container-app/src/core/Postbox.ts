// file: introduction-to-micro-frontends-project/container-app/src/core/Postbox.ts
import type {
  IPostbox,
  IPostboxMessage,
  IPostboxMessageBody
} from '../../../shared-types'

class Postbox implements IPostbox {
  pub<T = unknown>(topic: string, body: IPostboxMessageBody<T>) {
    const message: IPostboxMessage = {
      topic, 
      body
    }
    top?.postMessage(message)
  }

  sub<T = unknown>(topic: string, handler: (params?: T) => any) {
    top?.addEventListener('message', (e) => {
      if (e.data.topic === topic) {
        handler(e.data.body)
      }
    }, false);
  }
}

// @ts-ignore
window.postbox = new Postbox()

// @ts-ignore
window.usePostbox = (): IPostbox => {
  // @ts-ignore
  return window.postbox;
}

// @ts-ignore
export const usePostbox: () => IPostbox = window.usePostbox

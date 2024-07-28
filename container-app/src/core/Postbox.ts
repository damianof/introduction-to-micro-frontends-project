// file: introduction-to-micro-frontends-project/container-app/src/core/Postbox.ts
import type { IPostbox, IPostboxMessage, IPostboxMessageBody } from '../../../shared-types'

class Postbox implements IPostbox {
  pub<T = unknown>(topic: string, body: IPostboxMessageBody<T>) {
    const message: IPostboxMessage<T> = {
      topic,
      body,
    }
    top?.postMessage(message)
  }

  sub<T = unknown>(topic: string, handler: (params?: T) => any) {
    top?.addEventListener(
      'message',
      (e) => {
        if (e.data.topic === topic) {
          handler(e.data.body)
        }
      },
      false,
    )
  }
}

// we add a hook called usePostbox directly on the window object:
window.usePostbox = (): IPostbox => {
  if (!window._postbox) {
    window._postbox = new Postbox()
  }
  return window._postbox
}

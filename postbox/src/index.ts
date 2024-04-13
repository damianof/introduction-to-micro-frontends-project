// file: introduction-to-micro-frontends-project/postbox/src/index.ts
import type { IPostbox, IPostboxMessage, IPostboxMessageBody } from './types'

class Postbox implements IPostbox {
  async pub<T = unknown>(topic: string, body: IPostboxMessageBody<T>) {
    const message: IPostboxMessage<T> = {
      topic,
      body,
    }
    const targetOrigin = document.location.href
    top?.postMessage(message, targetOrigin)
    return true
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
if (top && !top.usePostbox) {
  top.usePostbox = (): IPostbox => {
    if (top && !top._postbox) {
      top._postbox = new Postbox()
    }
    return top?._postbox as IPostbox
  }
}

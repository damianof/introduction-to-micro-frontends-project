// file: introduction-to-micro-frontends-project/postbox/src/models.ts
export interface IPostboxMessageBody<T = unknown> {
  action: string
  params?: T
}

export interface IPostboxMessage<T = unknown> {
  topic: string
  body: IPostboxMessageBody<T>
}

export interface IPostbox {
  pub<T = unknown>(topic: string, body: IPostboxMessageBody<T>): any
  sub<T = unknown>(topic: string, handler: (params?: T) => any): any
}

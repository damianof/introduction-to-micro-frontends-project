/// <reference types="vite/client" />
import { IPostbox } from './types'

declare global {
  interface Window {
    _postbox: IPostbox
    usePostbox: () => IPostbox
  }
}

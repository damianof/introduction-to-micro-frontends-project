/// <reference types="svelte" />
/// <reference types="vite/client" />
import { IPostbox } from 'postbox'

declare global {
  interface Window {
    _postbox: IPostbox
    usePostbox: () => IPostbox
  }
}

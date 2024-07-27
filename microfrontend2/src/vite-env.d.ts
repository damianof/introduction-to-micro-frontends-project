/// <reference types="svelte" />
/// <reference types="vite/client" />
import { IPostbox } from '../../shared-types'

declare global {
  interface Window {
    _postbox: IPostbox
    usePostbox: () => IPostbox
  }
}

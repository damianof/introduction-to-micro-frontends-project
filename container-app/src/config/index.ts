// file: container/src/config/index.ts

interface IConfig {
  appModules: { [key: string]: string }
}

export const config: IConfig = {
  appModules: {
    microfrontend1: 'http://localhost:5001/microfrontend1/assets/index.js', // URL to your React micro-frontend bundle
    microfrontend2: 'http://localhost:5002/microfrontend2/assets/index.js', // URL to your Svelte micro-frontend bundle
    microfrontend3: 'http://localhost:5003/microfrontend3/assets/index.js', // URL to your Vue micro-frontend bundle
  },
}

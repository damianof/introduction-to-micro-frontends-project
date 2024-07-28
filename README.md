# introduction-to-micro-frontends-project
Companion code for the sample project from the book

    "build-all": "npm run build-microfrontend1; npm run build-microfrontend2; npm run build-microfrontend3; npm run build-root-styles",
    
    "build-microfrontend1": "cd microfrontend1; npm run build",
    "build-microfrontend2": "cd microfrontend2; npm run build",
    "build-microfrontend3": "cd microfrontend3; npm run build",
    "build-root-styles": "cd root-styles; npm run build",
    
    "serve": "pnpm --parallel --filter \"./**\" dev",
    "watch": "pnpm --parallel --filter \"./**\" watch-and-run"


Older:

    "build-all": "npm run build-microfrontend1; npm run build-microfrontend2; npm run build-microfrontend3; npm run build-root-styles",
    
    "build-microfrontend1": "cd microfrontend1; npm run build",
    "build-microfrontend2": "cd microfrontend2; npm run build",
    "build-microfrontend3": "cd microfrontend3; npm run build",
    "build-root-styles": "cd root-styles; npm run build",
    
    "serve": "npm run build-all; pnpm --parallel --filter \"./**\" dev"
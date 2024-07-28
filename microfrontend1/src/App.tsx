// file: App.tsx
// @ts-ignore
import React, { useState } from 'react'
import Counter from './components/Counter'
//import { FileUploadComponent } from '@builtwithjavascript/react-file-upload-tailwind'
//import type { IFileInfo } from '@builtwithjavascript/react-file-upload-tailwind'

function App() {
  // const onUploadClick = (model: IFileInfo): any => {
  //   console.log('onUploadClick', model)
  // }

  return (
    <div className="flex flex-col space-y-2">
      <Counter />

      {/* <FileUploadComponent 
        id="file-input" 
        uploadLabel="Import File"
        roundedCorners={false}
        onUploadClick={onUploadClick}/> */}
    </div>
  )
}

export default App

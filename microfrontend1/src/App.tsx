// file: App.tsx
// @ts-ignore
import React, { useState } from 'react'

import Counter from './components/Counter'
import { FileUploadComponent } from './components/file-upload/FileUpload.component'
import { IFileInfo } from '@builtwithjavascript/file-input-validator'

function App() {

  const onUploadClick = (model: IFileInfo): any => {
    console.log('onUploadClick', model)
  }

  return (
    <div className="flex flex-col space-y-2">
      <Counter/>

      <FileUploadComponent 
        id="file-input" 
        uploadLabel="Import File"
        onUploadClick={onUploadClick}/>
    </div>
  )
}

export default App

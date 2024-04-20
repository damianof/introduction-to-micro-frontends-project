// @ts-ignore
import React from 'react'
import { useState } from 'react'
import FileInputComponent from './FileInput.component'
import FileValidatorComponent from './FileValidator.component'
import { FileValidator } from './FileInputValidator'
import { 
  IFileInfo, 
  IFileValidatorItem,
  IFileValidatorOptions
} from './FileUploadTypes'

type IProps = {
  id: string
  uploadLabel: string
  validatorOptions?: IFileValidatorOptions
  onUploadClick: (model: IFileInfo) => any
}

export function FileUploadComponent(props: IProps) {
  // init FileValidator
  const fileValidator = new FileValidator(props.validatorOptions)

  // file info state
  const [fileInfo, setFileInfo] = useState<IFileInfo>({
    file: null,
    lastModified: '',
    fileSelected: false,
    isValid: false,
    name: '',
    displayName: '',
    message: ''
  })

  // validator items state
  const [validatorItems, setValidatorItems] = useState<IFileValidatorItem[]>([])

  const uploadDisabled = () => {
    if (!fileInfo.file) {
      return true
    }
    console.log('uploadDisabled', validatorItems.some(x => x.hasError))
    return validatorItems.some(x => x.hasError)
  }

  let _resetFunction: () => any
  const setResetFunction = (resetFunction: () => any) => {
    _resetFunction = resetFunction
  }

  const onFileInputChanged = (updatedModel: IFileInfo) => {
    console.log('onFileInputChanged', updatedModel)
    setFileInfo(updatedModel)
    setValidatorItems(fileValidator.validateFile(fileInfo))
  }

  const onUploadClick = () => {
    props.onUploadClick(fileInfo)
  }

  return (
    <div className="max-w-96 space-y-2">
      <FileInputComponent 
        id={`${props.id}-input`} 
        model={fileInfo} 
        changed={onFileInputChanged} 
        setResetFunction={setResetFunction} />
      <FileValidatorComponent
        model={fileInfo}
        id={`${props.id}-validator`}
        validatorItems={validatorItems}
        showOnlyErrors={true}
      />

      <button onClick={onUploadClick} 
        disabled={uploadDisabled()}
        className={`p-2 rounded-md ${ uploadDisabled() ? 'bg-gray-400' : 'bg-blue-500'} color-white`}>{ props.uploadLabel }</button>
    </div>
  )
}

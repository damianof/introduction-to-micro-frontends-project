// @ts-ignore
import React from 'react'
import FileValidatorRow from './FileValidatorRow.component'
import { 
  IFileInfo,
  IFileValidatorItem
 } from './FileUploadTypes'

type IProps = {
  id: string
  model: IFileInfo
  showOnlyErrors?: boolean
  validatorItems: IFileValidatorItem[]
}

export default function FileValidatorComponent({ model, validatorItems, showOnlyErrors }: IProps) {

  let domEl = null
  if (model.displayName.length > 0) {
    domEl = (
      <div className="file-validator">
        {model.message && 
          <div
            className={`file-validator-item px-4 py-2 flex items-center ${model.isValid ? 'bg-green-600' : 'bg-red-600'} text-white ${model.isValid ? 'success' : 'error'}`}
          >
            <span className="flex-none mr-2">{ model.isValid ? 'File:' : 'Error:' }</span>
            <span className="" title={model.isValid ? model.displayName : model.message}>
              { model.isValid ? model.displayName : model.message }
            </span>
          </div>
        }
        
        {!model.message && 
          <div>
            {validatorItems.filter(x => !showOnlyErrors || x.hasError).map((item, index) => {
              return (
                <FileValidatorRow
                  key={`file-validator-row-${index}`}
                  index={index}
                  totItemsCount={(validatorItems || []).length}
                  model={item}
                />
              )
            })}
          </div>
        }
      </div>
    )
  }

  return (
    <>{domEl}</>
  )
}
// @ts-ignore
import React, { useRef } from 'react'
import { 
  IFileInfo, 
  IFileValidatorItem, 
  IFileValidator, 
  IFileValidatorOptions
} from './FileUploadTypes'

export const getFileExtensionFromName = (name: string): string => {
  const parts = (name || '').split('.')
  if (parts && parts.length > 1) {
    return (parts[parts.length - 1] || '').trim().toLowerCase()
  }
  return ''
}

export const validateLastModified = (fileInfo: IFileInfo, availableValidatorItems: IFileValidatorItem[]) => {
  const file: any = fileInfo.file
  if (!file) {
    return
  }

  const validatorItem = availableValidatorItems.find((o) => o.name.toLowerCase() === 'lastmodified')
  if (!validatorItem) {
    return
  }

  // set also fileInfo property
  fileInfo.lastModified = file.lastModifiedDate

  // only truncated name here, no actual validation performed
  validatorItem.hasError = false
  validatorItem.value = fileInfo.lastModified
  validatorItem.displayValue = fileInfo.lastModified // later we might want to format this based on localization or user preferences?
}

export const DefaultFileValidatorOptions: IFileValidatorOptions = {
  allowedTypes: ['csv'],
  propertiesToValidate: ['name', 'type', 'size'],
  maxSize: 50,
  maxNameLength: 75,
  nameTruncateMaxLength: 35
}

export class FileValidator implements IFileValidator {
  private options: IFileValidatorOptions
  private availableValidatorItems: IFileValidatorItem[] = [
    {
      name: 'Name',
      value: '',
      displayValue: '',
      hasError: false,
      iconSuccess: '', //IconConstants.IconSuccess,
      iconError: '' //IconConstants.IconError
    },
    {
      name: 'Type',
      value: '',
      displayValue: '',
      hasError: false,
      iconSuccess: '', //IconConstants.IconSuccess,
      iconError: '' //IconConstants.IconError
    },
    {
      name: 'Size',
      value: '',
      displayValue: '',
      hasError: false,
      iconSuccess: '', //IconConstants.IconSuccess,
      iconError: '' //IconConstants.IconError
    }
  ]

  constructor(options?: IFileValidatorOptions) {
    this.options = {...DefaultFileValidatorOptions, ...(options || {})}
  }

  get validatorItems(): IFileValidatorItem[] {
    const propertiesToValidate = (this.options.propertiesToValidate || []).map((p) => p.toLowerCase())
    console.log('validatorItems: propertiesToValidate', propertiesToValidate)
    if (propertiesToValidate.length > 0) {
      const results = this.availableValidatorItems.filter(
        (item) => propertiesToValidate.indexOf(item.name.toLowerCase()) > -1
      )
      console.info('validatorItems: filtered validator items', results)
      return results
    }
    return []
  }

  // helper for friendly size display
  private formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 Bytes'
    }

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  private markFileInfoInvalid(fileInfo: IFileInfo, message?: string) {
    fileInfo.isValid = false
    let msg = (message || '').trim()
    if (msg.length > 0) {
      fileInfo.message = msg
    } else {
      fileInfo.message = ''
    }
  }

  private validatorStrategyLookup: {
    [key: string]: (fileInfo: IFileInfo) => void
  } = {
    name: (fileInfo: IFileInfo) => {
      const file = fileInfo.file
      if (!file) {
        return
      }

      const validatorItem = this.availableValidatorItems.find((o) => o.name.toLowerCase() === 'name')
      if (!validatorItem) {
        return
      }

      // only truncate name here, no actual validation performed
      const max = this.options.nameTruncateMaxLength
      const suffix = ' ...'
      const fileName = (file.name || '').trim()
      validatorItem.value = fileName
      if (fileName.length < max) {
        validatorItem.displayValue = fileName
      } else {
        // split in half and put ... in the middle
        const halfPoint = Math.round(fileName.length / 2)
        const maxChars = 13
        const left = fileName.substring(0, maxChars)
        const right = fileName.split('').reverse().join('').substring(0, maxChars).split('').reverse().join('')
        console.log('left right', halfPoint, left, right)
        validatorItem.displayValue = `${left} ${suffix} ${right}`
      }

      fileInfo.name = validatorItem.value
      fileInfo.displayName = validatorItem.displayValue

      if (fileName.length > this.options.maxNameLength) {
        const message = `max length allowed is ${this.options.maxNameLength.toString()} chars`
        validatorItem.hasError = true
        validatorItem.displayValue = `File name is too long - ${message}`
        this.markFileInfoInvalid(fileInfo)
      } else {
        fileInfo.message = fileInfo.name
        validatorItem.hasError = false
      }
    },
    type: (fileInfo: IFileInfo) => {
      const file = fileInfo.file
      if (!file) {
        return
      }

      // validate extension
      const allowedTypes = this.options.allowedTypes || []
      if (allowedTypes.length === 0) {
        this.markFileInfoInvalid(fileInfo, 'No allowed file types have been specified by the developer')
        return
      }

      if (allowedTypes.indexOf('*') > -1) {
        // all files allowed, just return
        return
      }

      const validatorItem = this.availableValidatorItems.find((o) => o.name.toLowerCase() === 'type')
      if (!validatorItem) {
        return
      }

      // build error message
      let errorMessage = ``
      if (allowedTypes.length > 1) {
        errorMessage = `file must be one of these types: ${allowedTypes.join(',')}`
      } else {
        errorMessage = `file type must be ${allowedTypes[0]}`
      }

      // validate
      //const parts = (file.name || '').split('.')
      //if (parts && parts.length > 1) {
      //  const ext = (parts[parts.length - 1] || '').trim().toLowerCase()
      const ext = getFileExtensionFromName(file.name)
      if (ext) {
        if (allowedTypes.indexOf(ext) > -1) {
          validatorItem.hasError = false
          validatorItem.value = file.type
          validatorItem.displayValue = ext
        } else {
          validatorItem.hasError = true
          validatorItem.value = file.type || 'unknown'
          validatorItem.displayValue = `${ext} - ${errorMessage}`
          this.markFileInfoInvalid(fileInfo)
        }
      } else {
        //setError(d, file.type || "unknown")
        validatorItem.hasError = true
        validatorItem.value = file.type || 'unknown'
        validatorItem.displayValue = `${validatorItem.value} - ${errorMessage}`
        this.markFileInfoInvalid(fileInfo)
      }
    },
    size: (fileInfo: IFileInfo) => {
      const file = fileInfo.file
      if (!file) {
        return
      }

      const validatorItem = this.availableValidatorItems.find((o) => o.name.toLowerCase() === 'size')
      if (!validatorItem) {
        return
      }

      const oneMB = 1024000
      const origFileSizeInBytes = file.size
      const maxFileSizeInBytes = oneMB * this.options.maxSize
      validatorItem.value = `${origFileSizeInBytes} bytes`
      validatorItem.displayValue = this.formatBytes(origFileSizeInBytes)

      if (origFileSizeInBytes > maxFileSizeInBytes) {
        const errorMessage = `max upload size is ${this.options.maxSize.toString()} MB`
        validatorItem.hasError = true
        validatorItem.displayValue = `${validatorItem.displayValue} - ${errorMessage}`
        this.markFileInfoInvalid(fileInfo)
      } else {
        validatorItem.hasError = false
      }
    },
    datemodified: (fileInfo: IFileInfo) => {
      validateLastModified(fileInfo, this.availableValidatorItems)
    },
    lastmodified: (fileInfo: IFileInfo) => {
      validateLastModified(fileInfo, this.availableValidatorItems)
    }
  }

  validateFile(fileInfo: IFileInfo): IFileValidatorItem[] {
    const file: any = fileInfo.file
    //_logger.log('validateFile !file', !file)
    if (file) {
      // set it as valid and then run validation
      fileInfo.isValid = true

      const propertiesToValidate = this.options.propertiesToValidate || []
      if (propertiesToValidate.length > 0) {
        propertiesToValidate.forEach((propertyName) => {
          const loweredPropertyName = propertyName.toLowerCase()
          if (this.validatorStrategyLookup.hasOwnProperty(loweredPropertyName)) {
            const strategy = this.validatorStrategyLookup[loweredPropertyName]
            strategy(fileInfo)
          } else {
            console.log('FileValidator: Warning: could not find validator for property', loweredPropertyName)
          }
        })
      }
    } else {
      this.markFileInfoInvalid(fileInfo, `No file has been selected`)
    }

    // if file is valid, hide the name Validator Item
    return this.validatorItems
  }
}

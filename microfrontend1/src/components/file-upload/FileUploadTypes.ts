
export interface IFileInfo {
  file: File | null
  lastModified: string
  fileSelected: boolean
  isValid: boolean
  name: string
  displayName: string
  message: string
}

export interface IFileValidatorItem {
  name: string
  value: string
  displayValue: string
  hasError: boolean
  iconSuccess: string
  iconError: string
}

export interface IFileValidatorOptions {
  allowedTypes: string[] // list of extensions allowed i.e. ['csv', 'xls']
  maxSize: number // in MB
  maxNameLength: number
  nameTruncateMaxLength: number
  propertiesToValidate: string[]
}

export interface IFileValidator {
  validatorItems: IFileValidatorItem[]
  validateFile(fileInfo: IFileInfo): IFileValidatorItem[]
}

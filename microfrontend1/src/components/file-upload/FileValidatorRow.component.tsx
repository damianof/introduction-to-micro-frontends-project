import { IFileValidatorItem } from './FileUploadTypes'

type IProps = {
  index: number
  totItemsCount: number
  model: IFileValidatorItem
}

export default function FileValidatorRow({ model, index, totItemsCount }: IProps) {

  const cssClass = () => {
    const { hasError } = model
    const isFirst = index === 0
    const isLast = index === totItemsCount - 1
    const result = ['file-validator-item px-4 py-2 flex items-center text-white']

    // item success/error class
    result.push(hasError ? 'bg-red-600' : 'bg-green-600')

    // if (isFirst) {
    //   result.push('rounded-t-lg')
    // }
    // if (isLast) {
    //   result.push('rounded-b-lg')
    // }

    if (!isLast && totItemsCount > 1) {
      result.push('border-b-0')
    }

    return result.join(' ').trim()
  }

  return (
    <div className={cssClass()} title={model.value}>
      {/* TODO icon <icon class="h-4 w-4 flex-none" aria-hidden="true" :title="validationIcon" /> */}
      <span className="property-name flex-none w-20">{ model.name }</span>
      <span className="property-value flex-initial overflow-hidden overflow-ellipsis whitespace-nowrap">{ model.displayValue }</span>
    </div>
  )
}
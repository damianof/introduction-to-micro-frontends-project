export interface IEventAction {
  type: string
  args?: any
}

export type TEmitsAction = (
  e: 'action',
  params: IEventAction
) => any

export type TEmitsClicked = (
  e: 'clicked',
  params: IEventAction
) => any

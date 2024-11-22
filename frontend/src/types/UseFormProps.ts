import { ChangeEvent } from 'react'

export interface UseFormProps<T> {
  values: T
  handleFormChanges: (e: ChangeEvent<any>) => void
  clearForm: () => void
  handleFormSubmit: (e: any) => void
}

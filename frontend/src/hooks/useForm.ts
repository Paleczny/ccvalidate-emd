import { ChangeEvent, useState } from 'react'
import { UseFormProps } from '../types/UseFormProps'

export const useForm = <T>(callback: (e?: any) => void, initialFormValues: T): UseFormProps<T> => {
  const [values, setValues] = useState<T>(initialFormValues)

  const handleFormChanges = (e: ChangeEvent<any>) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      }
    })
  }

  const clearForm = () => {
    setValues(initialFormValues)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    callback(e)
    clearForm()
  }

  return { values, handleFormChanges, clearForm, handleFormSubmit }
}

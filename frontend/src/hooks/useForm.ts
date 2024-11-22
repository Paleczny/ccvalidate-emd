import { ChangeEvent, useState } from 'react'
import { UseFormReturnProps } from '../types/UseFormReturnProps'

export const useForm = <T>(initialFormValues: T): UseFormReturnProps<T> => {
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

  return { values, handleFormChanges, clearForm }
}

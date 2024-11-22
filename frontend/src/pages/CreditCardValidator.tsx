import { useForm } from '../hooks/useForm'
import { CreditCard } from '../types/CreditCard'
import { UseFormProps } from '../types/UseFormProps'
import { ChangeEvent } from 'react'
import { useFetcher } from '../hooks/useFetcher'

const CreditCardValidator = () => {
  const { values, handleFormChanges, clearForm }: UseFormProps<CreditCard> = useForm({
    ccNumber: '',
  })

  const { loading, result, fetchApi } = useFetcher('POST', 'http://localhost:5000/validate', JSON.stringify(values))

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchApi()
    // clearForm()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="CreditCardInput">Credit Card Number</label>
        <input id="CreditCardInput" value={values.ccNumber} name="ccNumber" onChange={handleFormChanges} />
        <button>Validate</button>
      </form>
    </>
  )
}

export default CreditCardValidator

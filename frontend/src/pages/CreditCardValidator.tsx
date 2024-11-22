import { useForm } from '../hooks/useForm'
import { CreditCard } from '../types/CreditCard'
import { UseFormProps } from '../types/UseFormProps'
import { ChangeEvent } from "react"

const CreditCardValidator = () => {
  const { values, handleFormChanges, handleFormSubmit }: UseFormProps<CreditCard> = useForm(handleSubmit, {
    ccNumber: '',
  })

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    console.log('handleformSubmit: ', e.target)
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="CreditCardInput">Credit Card Number</label>
        <input id="CreditCardInput" value={values.ccNumber} name="ccNumber" onChange={(e) => handleFormChanges(e)} />
        <button>Validate</button>
      </form>
    </>
  )
}

export default CreditCardValidator

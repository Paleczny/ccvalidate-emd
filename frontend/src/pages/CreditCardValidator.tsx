import { useForm } from '../hooks/useForm'
import { CreditCard } from '../types/CreditCard'
import { UseFormReturnProps } from '../types/UseFormReturnProps'
import React from 'react'
import { useFetcher } from '../hooks/useFetcher'
import { CreditCardValidatorResponse } from '../types/CreditCardValidatorResponse'
import { UseFetcherReturnProps } from '../types/UseFetcherReturnProps'

const CreditCardValidator = () => {
  const { values, handleFormChanges }: UseFormReturnProps<CreditCard> = useForm({
    ccNumber: '',
  })

  const { loading, result, fetchApi }: UseFetcherReturnProps<CreditCardValidatorResponse> = useFetcher(
    'POST',
    'http://localhost:5000/validate',
    JSON.stringify(values),
  )

  const formatCardNumber = (): string => {
    return values.ccNumber.length === 0
      ? '1234 5678 9123 3456 7892'.replace(/(\d{4})/g, '$1 ').trim()
      : values.ccNumber.replace(/(\d{4})/g, '$1 ').trim()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) && // Only allow numbers
      e.key !== 'Backspace' && // Allow backspace
      e.key !== 'ArrowLeft' && // Allow left arrow key
      e.key !== 'ArrowRight' && // Allow right arrow key
      e.key !== 'Delete' && // Allow delete key
      e.key !== 'Tab' // Allow tab key for navigation
    ) {
      e.preventDefault()
    }
  }

  return (
    <div className="container  d-flex flex-column justify-content-center align-items-center">
      <div
        className={`mt-5 rounded-2 card-4 shadow-sm bg-secondary bg-opacity-25 w-100 border border-2 ${result && !result.isValid && 'border-danger'} ${result && result.isValid && 'border-success'}`}
        style={{ maxWidth: '400px', minHeight: '220px' }}
      >
        <form onSubmit={fetchApi}>
          <div className="mb-3 mx-3 py-3 ">
            <h4 className="form-label">Credit Card</h4>
            <br />
            <text className="d-flex justify-content-center" style={{ fontFamily: 'Futura' }}>
              {formatCardNumber()}
            </text>
            <input
              className="rounded-4 px-5-3 form-control mt-2"
              name="ccNumber"
              type="text"
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              value={values.ccNumber}
              onKeyDown={handleKeyDown}
              onChange={handleFormChanges}
            />
          </div>
          {result && (
            <text className="d-flex justify-content-center" style={{ fontFamily: 'Courier' }}>
              {!result.isValid ? 'Invalid' : 'Valid'} Credit Card Number
            </text>
          )}
        </form>
      </div>
      <button
        type="submit"
        disabled={!values.ccNumber || loading}
        onClick={fetchApi}
        className="mt-5 w-100 btn btn-primary"
      >
        Validate
      </button>
    </div>
  )
}

export default CreditCardValidator

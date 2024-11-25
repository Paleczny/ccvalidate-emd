import React from 'react'
import { useForm } from '../hooks/useForm'
import { CreditCard } from '../types/CreditCard'
import { CreditCardValidatorResponse } from '../types/CreditCardValidatorResponse'
import { useFetcher } from '../hooks/useFetcher'
import { UseFormReturnProps } from '../types/UseForm.types'
import { UseFetcherReturnProps } from '../types/UseFetcher.types'

/**
 * CreditCardValidator Component
 *
 * This component provides a form for users to input a credit card number and validate it using the Luhn algorithm.
 * It leverages two custom hooks, `useForm` for managing form state and `useFetcher` for handling the API request.
 *
 * The input field is restricted to only allow numeric input and a few control keys (e.g., backspace, arrow keys).
 * The component also formats the credit card number for better readability.
 *
 * @component
 * @example
 * return (
 *   <CreditCardValidator />
 * )
 *
 * @returns {JSX.Element} A React component containing the credit card validation form.
 */
const CreditCardValidator = () => {
  const { values, handleFormChanges }: UseFormReturnProps<CreditCard> = useForm({
    initialFormValues: {
      ccNumber: '',
    },
  })

  const { loading, result, fetchApi }: UseFetcherReturnProps<CreditCardValidatorResponse> = useFetcher({
    method: 'POST',
    url: 'http://localhost:5000/validate',
    body: JSON.stringify(values),
  })

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
        className={`mt-5 rounded-4 card-4 shadow-sm bg-secondary bg-opacity-25
        ${loading && 'placeholder-wave placeholder'} 
        w-100 border border-2 ${result && !result.isValid && 'border-danger'} ${result && result.isValid && 'border-success'}`}
        style={{ maxWidth: '400px', minHeight: '220px' }}
      >
        <form onSubmit={fetchApi}>
          <div className="mb-3 mx-3 py-3">
            <h4 className="form-label">Credit Card</h4>
            <br />
            <h6
              className="d-flex justify-content-center"
              style={{ fontFamily: 'Futura' }}
              data-testid="card-number-formatted"
            >
              {formatCardNumber()}
            </h6>
            <input
              className="rounded-4 px-5-3 form-control mt-4"
              data-testid="card-number-input"
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
            <h6
              className="d-flex justify-content-center"
              data-testid="validation-text"
              style={{ fontFamily: 'Courier' }}
            >
              {!result.isValid ? 'Invalid' : 'Valid'} Credit Card Number
            </h6>
          )}
        </form>
      </div>
      <button
        className="mt-5 w-50 btn btn-primary"
        data-testid="validate-button"
        type="submit"
        disabled={!values.ccNumber || loading}
        onClick={fetchApi}
      >
        Validate
      </button>
    </div>
  )
}

export default CreditCardValidator

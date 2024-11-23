import React, { act } from 'react'
import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import CreditCardValidator from '../CreditCardValidator'

const user = userEvent.setup()

describe('CreditCardValidator Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ isValid: true }),
        }) as Promise<Response>,
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render correctly with initial values', () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const ccInputElement = getByTestId('card-number-input') as HTMLInputElement
    const validateButtonElement = getByTestId('validate-button') as HTMLButtonElement

    expect(ccInputElement.value).toBe('')
    expect(validateButtonElement).toBeDisabled()
  })

  it('should update card number value on input change', async () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const ccInputElement = getByTestId('card-number-input') as HTMLInputElement
    const formattedCCHeadingElement = getByTestId('card-number-formatted') as HTMLHeadingElement

    await act(async () => {
      await user.type(ccInputElement, '1234567812345678')
    })

    expect(formattedCCHeadingElement.textContent).toBe('1234 5678 1234 5678')
  })

  it('should only allow numeric input in the card number field', async () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const ccInputElement = getByTestId('card-number-input') as HTMLInputElement

    await act(async () => {
      await user.type(ccInputElement, '1234abcd')
    })

    expect(ccInputElement.value).toBe('1234') // Should ignore non-numeric input
  })

  it('should enable the Validate button when card number is entered', async () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const ccInputElement = getByTestId('card-number-input') as HTMLInputElement
    const validateButtonElement = getByTestId('validate-button') as HTMLButtonElement

    await act(async () => {
      await user.type(ccInputElement, '1234567812345678')
    })

    expect(validateButtonElement).not.toBeDisabled()
  })

  it('should disable the Validate button when loading', async () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const validateButtonElement = getByTestId('validate-button') as HTMLButtonElement

    await act(async () => {
      validateButtonElement.click()
    })

    await waitFor(() => {
      expect(validateButtonElement).toBeDisabled()
    })
  })

  it('should display validation result after fetching', async () => {
    const { getByTestId } = render(<CreditCardValidator />)
    const ccInputElement = getByTestId('card-number-input') as HTMLInputElement
    const validateButtonElement = getByTestId('validate-button') as HTMLButtonElement

    await act(async () => {
      await user.type(ccInputElement, '1234567812345678')
      validateButtonElement.click()
    })

    await waitFor(() => {
      expect(getByTestId('validation-text')).toBeInTheDocument()
    })
  })
})

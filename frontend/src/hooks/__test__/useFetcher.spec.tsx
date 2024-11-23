import React, { act } from 'react'
import { render, waitFor } from '@testing-library/react'
import { useFetcher } from '../useFetcher'
import { UseFetcherProps, UseFetcherReturnProps } from "../../types/UseFetcher.types"

const TestComponent = ({ method, url, body }: UseFetcherProps) => {
  const { loading, result, fetchApi }: UseFetcherReturnProps<any> = useFetcher({ method, url, body })

  return (
    <>
      <button onClick={fetchApi} data-testid="fetch-button">
        Fetch Data
      </button>
      {loading && <p data-testid="loading-indicator">Loading...</p>}
      {result && <p data-testid="result">{JSON.stringify(result)}</p>}
    </>
  )
}

describe('useFetcher Hook', () => {
  const mockUrl = 'https://jsonplaceholder.typicode.com/posts/1'

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 1, title: 'Mocked Post', body: 'This is a mocked post.' }),
        }) as Promise<Response>,
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should start with loading as false and no result', () => {
    const { queryByTestId } = render(<TestComponent method="GET" url={mockUrl} />)

    expect(queryByTestId('loading-indicator')).not.toBeInTheDocument()
    expect(queryByTestId('result')).not.toBeInTheDocument()
  })

  it('should display loading state during fetch', async () => {
    const { getByTestId } = render(<TestComponent method="GET" url={mockUrl} />)
    const fetchButton = getByTestId('fetch-button')

    await waitFor(() => {
      fetchButton.click()
      expect(getByTestId('loading-indicator')).toBeInTheDocument()
    })
  })

  it('should update result after successful fetch', async () => {
    const { getByTestId } = render(<TestComponent method="GET" url={mockUrl} />)
    const fetchButton = getByTestId('fetch-button')

    await act(async () => {
      fetchButton.click()
    })

    await waitFor(() => {
      expect(getByTestId('result')).toHaveTextContent('Mocked Post')
    })
  })

  it('should handle fetch error gracefully', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: false,
        }) as Promise<Response>,
    )

    const { getByTestId, queryByTestId } = render(<TestComponent method="GET" url={mockUrl} />)
    const fetchButton = getByTestId('fetch-button')

    await act(async () => {
      fetchButton.click()
    })

    await waitFor(() => {
      expect(queryByTestId('result')).not.toBeInTheDocument()
    })
  })
})

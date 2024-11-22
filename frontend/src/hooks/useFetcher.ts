import { useState } from 'react'

export const useFetcher = (method: 'POST' | 'GET', url: string, body?: BodyInit) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const fetchApi = async () => {
    setLoading(true)
    const requestInit: RequestInit = {
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
    }

    try {
      const response = await fetch(url, requestInit)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return { loading, result, fetchApi }
}

export interface UseFetcherReturnProps<T> {
  loading: boolean
  result: T | null
  fetchApi: () => Promise<void>
}

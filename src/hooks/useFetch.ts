import { movieDomain } from '@/constants/domain'

type FetchParams = {
  endpoint: string
  options?: RequestInit
}

const useFetch = async ({ endpoint, options }: FetchParams) => {
  try {
    const res = await fetch(movieDomain + endpoint, options)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const { data, ...rest } = await res.json()
    return data || rest
  } catch (error) {
    return null
  }
}

export default useFetch

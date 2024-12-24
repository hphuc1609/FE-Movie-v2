import { movieDomain } from '@/constants/domain'

type FetchParams = {
  endpoint: string
  options?: RequestInit
}

const useFetch = async ({ endpoint, options }: FetchParams) => {
  try {
    const res = await fetch(movieDomain + endpoint, {
      next: { revalidate: 0 },
      ...options,
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const { data, items, ...rest } = await res.json()
    return data || items || rest
  } catch (error) {
    return null
  }
}

export default useFetch

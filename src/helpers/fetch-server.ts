import { movieDomain } from '@/constants/domain'

type FetchServerParams = {
  endpoint: string
  tags?: string[]
  params?: { [key: string]: string | number | undefined | null }
}

/**
 * Fetches data from a server using the specified endpoint and query parameters.
 *
 * @param {FetchServerParams} params - The parameters for the fetch operation.
 * @param {string} params.endpoint - The API endpoint to fetch data from.
 * @param {Object} [params.params] - An optional object containing query parameters as key-value pairs.
 * @param {string[]} [params.tags] - Optional tags for additional request configuration.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchServer({ endpoint, tags, params }: FetchServerParams): Promise<any> {
  const queryParams = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, value]) => {
      if (value) acc.set(key, value.toString())
      return acc
    }, new URLSearchParams()),
  )

  // Tạo URL đầy đủ
  const url = new URL(`${movieDomain}${endpoint}?${queryParams.toString()}`)

  try {
    const res = await fetch(url, {
      next: { tags, revalidate: 30 },
    })

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

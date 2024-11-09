import { movieDomain } from '@/constants/domain'

type FetchServerParams = {
  endpoint: string
  params?: { [key: string]: string | number | undefined | null }
  nextOptions?: RequestInit
}

/**
 * Fetches data from a server using the specified endpoint and query parameters.
 *
 * @param {FetchServerParams} params - The parameters for the fetch operation.
 * @param {string} params.endpoint - The API endpoint to fetch data from.
 * @param {Object} [params.params] - An optional object containing query parameters as key-value pairs.
 * @param {RequestInit} [params.nextOptions] - An optional object containing additional options for the fetch operation.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchServer({
  endpoint,
  params,
  nextOptions,
}: FetchServerParams): Promise<any> {
  const queryParams = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, value]) => {
      if (value) acc.set(key, value.toString())
      return acc
    }, new URLSearchParams()),
  )

  const url = new URL(`${movieDomain}${endpoint}${queryParams ? `?${queryParams}` : ''}`)

  try {
    const res = await fetch(url, {
      cache: 'no-cache',
      headers: { 'Cache-Control': 'no-cache' },
      ...nextOptions,
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

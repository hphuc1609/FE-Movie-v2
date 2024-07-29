'use client'

import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'

interface FetchDataOptions<T>
  extends Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn'> {
  queryKey: QueryKey
  queryFn: () => Promise<T>
}

const useFetchData = <T>({ queryKey, queryFn, ...options }: FetchDataOptions<T>) => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export default useFetchData

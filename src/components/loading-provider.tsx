'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Loader from './loader'

const LoadingContext = React.createContext({ isLoading: false, show: () => {}, hidden: () => {} })

export const useLoading = () => React.useContext(LoadingContext)

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = React.useState(false)
  const queryClient = new QueryClient()

  const show = () => {
    setLoading(true)
  }
  const hidden = () => {
    setLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, show, hidden }}>
      <QueryClientProvider client={queryClient}>
        {isLoading && <Loader />}
        {children}
      </QueryClientProvider>
    </LoadingContext.Provider>
  )
}

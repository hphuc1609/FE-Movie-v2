'use client'

import React from 'react'
import Loader from './loader'

const ContextGlobal = React.createContext({
  isLoading: false,
  showLoading: () => {},
  hiddenLoading: () => {},
  isLogin: false,
  setLogin: (value: boolean) => {},
})

export const useContextGlobal = () => React.useContext(ContextGlobal)

interface ContextProviderProps {
  children: React.ReactNode
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [isLogin, setLogin] = React.useState(false)

  const showLoading = () => {
    setLoading(true)
  }
  const hiddenLoading = () => {
    setLoading(false)
  }

  return (
    <ContextGlobal.Provider value={{ isLoading, showLoading, hiddenLoading, isLogin, setLogin }}>
      {isLoading && <Loader />}
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider

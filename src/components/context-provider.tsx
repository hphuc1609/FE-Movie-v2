'use client'

import { getCookie } from 'cookies-next'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
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

  const pathname = usePathname()

  // Set last path
  useEffect(() => {
    if (['/login', '/register'].includes(pathname)) {
      return
    }
    localStorage.setItem('lastPath', pathname)
  }, [pathname])

  // Check login
  useEffect(() => {
    const userInfo = getCookie('userVerify')
    if (userInfo) setLogin(true)
  }, [])

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

'use client'

import { getCookie } from 'cookies-next'
import { usePathname } from 'next/navigation'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import Loader from './loader'

const ContextGlobal = createContext({
  isLoading: false,
  showLoading: () => {},
  hiddenLoading: () => {},
  isLogin: false,
  setLogin: (value: boolean) => {},
})

export const useContextGlobal = () => useContext(ContextGlobal)

interface ContextProviderProps {
  children: ReactNode
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const [isLoading, setLoading] = useState(false)
  const [isLogin, setLogin] = useState(false)

  // Save last path
  useEffect(() => {
    if (['/login', '/register'].includes(pathname)) {
      return
    }
    const searchParam = new URLSearchParams(window.location.search)
    const searchToString = searchParam.toString()
    const lastPath = `${pathname}${searchToString ? `?${searchToString}` : ''}`

    localStorage.setItem('lastPath', lastPath)
  }, [pathname])

  // Check user is login
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

'use client'

import React from 'react'
import { useLoading } from '../loading-provider'
import './loader.css'

export default function Loader() {
  const loader = useLoading()

  return (
    loader.isLoading && (
      <div
        className='w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black scrollbar-none'
        style={{ zIndex: 9999 }}
      >
        <div className='loader'></div>
      </div>
    )
  )
}

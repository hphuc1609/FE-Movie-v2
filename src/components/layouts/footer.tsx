'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='relative bg-[#181818] dark:bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-[25px] py-8 lg:px-10'>
        <div className='flex items-center justify-between max-md:flex-col max-md:items-baseline'>
          <Link
            href='/'
            className='text-xl font-normal text-primary-color'
          >
            Mephim247
          </Link>
          <Button
            size={'icon'}
            className='rounded-full h-[50px] w-[50px] bg-primary-color absolute left-1/2 -top-4 -translate-x-1/2 hover:bg-primary-color'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp
              size={30}
              color='white'
            />
          </Button>
          <div className='mt-4 text-sm lg:mt-0 lg:text-right'>
            <span className='opacity-50'>
              Mephim247 &copy; {new Date().getFullYear()}. All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

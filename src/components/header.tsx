/* eslint-disable react/no-children-prop */
'use client'

import menuLinks, { MenuItem } from '@/constants/menu'
import useScrollPosition from '@/custom-hooks/useScrollPosition'
import { cn } from '@/lib/utils'
import { ChevronDown, Menu, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import DialogCustom from './common/dialog'
import Drawer from './drawer'
import { Input } from './ui/input'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar'
import { Separator } from './ui/separator'

export default function Header() {
  const pathname = usePathname()
  const isHomePathname = pathname === '/'
  const scrollPosition = useScrollPosition()

  return (
    <header
      className={`w-full h-16 flex items-center justify-between ${
        isHomePathname ? 'fixed' : 'sticky'
      } top-0 z-50 transition duration-300 ${scrollPosition > 0 && 'bg-black bg-opacity-70'}`}
    >
      <div className='mx-auto max-w-screen-xl w-full px-[25px] py-8 lg:px-10'>
        <HeaderMenubar />
      </div>
    </header>
  )
}

const HeaderMenubar = React.memo(() => {
  const router = useRouter()
  const [openDialogSearch, setOpenDialogSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openMenu, setOpenMenu] = useState(false)

  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !event.currentTarget.value) {
      return
    }
    setOpenDialogSearch(false)
    router.push(`/danh-sach/search?keyword=${event.currentTarget.value}`)
  }

  const handleSearchClick = () => {
    if (!searchValue) return
    setOpenDialogSearch(false)
    setSearchValue('')
    router.push(`/danh-sach/search?keyword=${searchValue}`)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCloseDrawer = useCallback(() => {
    setOpenMenu(false)
  }, [setOpenMenu])

  return (
    <>
      <div className='flex justify-between items-center gap-8'>
        <div className='flex gap-8 h-full items-center'>
          <Link
            href='/'
            className='text-2xl font-bold text-nowrap'
          >
            VPhim <span className='text-primary-color'>247</span>
          </Link>
          <div className='flex items-center gap-5 h-full max-w-screen-lg max-md:hidden text-white'>
            {menuLinks.map((menuItem) => (
              <TextMenubar
                key={menuItem.name}
                data={menuItem}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <DialogCustom
            open={openDialogSearch}
            setOpen={setOpenDialogSearch}
            title={'Bạn tìm phim gì?'}
            children={<Search size={20} />}
            content={
              <div className='flex items-center'>
                <Input
                  placeholder='Nhập tên phim, chương trình,...'
                  autoFocus
                  onKeyDown={(e) => handleInputKeyDown(e)}
                  onChange={(e) => handleInputChange(e)}
                  className='text-white text-lg bg-transparent p-0 pr-10 border-transparent rounded-none !border-b-[#ccc] focus-visible:ring-0 focus-visible:ring-offset-0'
                />
                <Search
                  size={20}
                  className='cursor-pointer -ml-8'
                  onClick={handleSearchClick}
                />
              </div>
            }
          />
          <Separator
            className='h-4'
            orientation='vertical'
          />
          <User
            fill='white'
            size={20}
          />
          <Menu
            className='md:hidden'
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </div>
      {/* Drawer side bar*/}
      <Drawer
        openMenu={openMenu}
        onClose={handleCloseDrawer}
      />
    </>
  )
})
HeaderMenubar.displayName = 'HeaderMenubar'

const TextMenubar = React.memo(({ data }: { data: MenuItem }) => {
  const pathname = usePathname()
  const isActiveLink = pathname.endsWith(data.href ?? '')

  const checkUrl = (link: string) => {
    return link === '/' ? link : `/danh-sach${link.startsWith('/') ? link : `/${link}`}?page=1`
  }
  return (
    <Menubar className='bg-transparent border-none p-0'>
      <MenubarMenu>
        <MenubarTrigger className='p-0 !bg-transparent text-sm uppercase font-semibold !text-current'>
          {data.href ? (
            <Link
              href={checkUrl(data.href)}
              className={cn('opacity-80 hover:opacity-100', isActiveLink && 'opacity-100')}
            >
              {data.name}
            </Link>
          ) : (
            <div className='cursor-pointer flex items-center opacity-80 hover:opacity-100'>
              {data.name}
              <ChevronDown
                strokeWidth={2}
                size={20}
                className='ml-1'
              />
            </div>
          )}
        </MenubarTrigger>
        {data.subMenu && (
          <MenubarContent className='min-w-fit grid grid-cols-4 gap-x-3 gap-y-1 bg-black bg-opacity-80 z-50 border-none text-white'>
            {data.subMenu?.map((item) => (
              <Link
                key={item.name}
                href={checkUrl(item.href)}
              >
                <MenubarItem className='cursor-pointer capitalize'>{item.name}</MenubarItem>
              </Link>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
})
TextMenubar.displayName = 'TextMenubar'

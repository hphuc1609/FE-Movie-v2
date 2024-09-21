'use client'

import DialogCustom from '@/components/common/dialog'
import { useContextGlobal } from '@/components/context-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { Separator } from '@/components/ui/separator'
import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import useScrollPosition from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { INavbar } from '@/models/interfaces/navbar'
import { useCountries } from '@/services/query-data'
import { getCookie } from 'cookies-next'
import { ChevronDown, Menu, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Drawer from '../drawer'
import Account from './account'

export default function Header() {
  const pathname = usePathname()
  const scrollPosition = useScrollPosition()

  const isHomePathname = pathname === '/'
  const isAuthPath = pathname === '/login' || pathname === '/register'

  return (
    <header
      className={`w-full h-16 flex items-center justify-between ${
        isHomePathname ? 'fixed' : 'sticky border-b border-neutral-200 border-opacity-10'
      } top-0 z-50 transition duration-300 ${scrollPosition > 0 && 'bg-neutral-900/50 backdrop-blur-md'} ${isAuthPath && 'hidden'}`}
    >
      <HeaderMenubar />
    </header>
  )
}

const HeaderMenubar = React.memo(() => {
  const router = useRouter()
  const { isLogin } = useContextGlobal()
  const [hasToken, setHasToken] = useState(false)

  // Check token
  useEffect(() => {
    const userInfo = getCookie('userVerify')
    const token = userInfo ? JSON.parse(userInfo)?.token : null

    if (token) {
      setHasToken(true)
      return
    }
    setHasToken(false)
  }, [isLogin])

  const [openDialogSearch, setOpenDialogSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openMenu, setOpenMenu] = useState(false)

  const { data: countries = [] } = useCountries()

  const navbarItems: INavbar[] = [
    { name: 'Phim lẻ', href: '/phim-le' },
    { name: 'Phim bộ', href: '/phim-bo' },
    { name: 'Thể loại', subMenu: dataTheLoai },
    { name: 'Quốc gia', subMenu: countries },
    { name: 'Năm', subMenu: dataNamPhatHanh },
  ]

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim()

    if (event.key !== 'Enter' || !value) {
      return
    }
    setOpenDialogSearch(false)
    router.push(`/danh-sach/tim-kiem?keyword=${value}`)
  }

  const handleSearchClick = () => {
    if (!searchValue) return

    setOpenDialogSearch(false)
    setSearchValue('')
    router.push(`/danh-sach/tim-kiem?keyword=${searchValue}`)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCloseDrawer = () => {
    setOpenMenu(false)
  }

  return (
    <div className='mx-auto max-w-screen-xl w-full px-[25px] lg:px-10 flex justify-between items-center gap-8'>
      <div className='flex gap-8 h-full items-center'>
        <Link
          href='/'
          className='text-3xl max-sm:text-2xl text-nowrap font-mono font-bold'
        >
          Mephim<span className='text-primary-color'>247</span>
        </Link>
        <nav className='flex items-center gap-5 h-full max-w-screen-lg max-md:hidden text-white'>
          {navbarItems.map((menuItem) => (
            <TextMenubar
              key={menuItem.name}
              item={menuItem}
            />
          ))}
        </nav>
      </div>
      <div className='flex items-center gap-2'>
        <Search
          size={20}
          className='hover:text-primary-color cursor-pointer'
          onClick={() => setOpenDialogSearch(true)}
        />
        <Separator
          className='h-4'
          orientation='vertical'
        />
        {hasToken ? (
          <Account />
        ) : (
          <Button
            variant={'link'}
            className='text-base max-sm:text-sm text-current hover:no-underline font-semibold p-0'
            onClick={() => router.push('/login')}
          >
            Đăng nhập
          </Button>
        )}
        <Menu
          className='md:hidden cursor-pointer'
          onClick={() => setOpenMenu(true)}
        />
      </div>

      {/* Mobile menu */}
      <Drawer
        data={navbarItems}
        openMenu={openMenu}
        onClose={handleCloseDrawer}
      />

      <DialogCustom
        open={openDialogSearch}
        setOpen={setOpenDialogSearch}
        title={'Bạn tìm phim gì?'}
        content={
          <div className='flex items-center'>
            <Input
              placeholder='Tìm kiếm phim...'
              autoFocus
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleInputChange(e)}
              className='text-white text-lg bg-transparent p-0 pr-10 border-transparent rounded-none !border-b-[#ccc] focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Search
              size={20}
              className='cursor-pointer -ml-8 hover:text-primary-color'
              onClick={handleSearchClick}
            />
          </div>
        }
      />
    </div>
  )
})

HeaderMenubar.displayName = 'HeaderMenubar'

const TextMenubar = ({ item }: { item: INavbar }) => {
  const pathname = usePathname()

  const activeLink = (link: string) => pathname.endsWith(link)

  const checkUrl = (link: string) => {
    return link === '/' ? link : `/danh-sach${link.startsWith('/') ? link : `/${link}`}?page=1`
  }

  return (
    <Menubar className='bg-transparent border-none p-0'>
      <MenubarMenu>
        <MenubarTrigger className='p-0 !bg-transparent text-base capitalize font-semibold !text-current'>
          {item.href ? (
            <Link
              href={checkUrl(item.href)}
              className={cn('opacity-80 hover:opacity-100', activeLink(item.href) && 'opacity-100')}
            >
              {item.name}
            </Link>
          ) : (
            <div className='cursor-pointer flex items-center opacity-80 hover:opacity-100'>
              {item.name}
              <ChevronDown
                strokeWidth={2}
                size={16}
                className='ml-1'
              />
            </div>
          )}
        </MenubarTrigger>
        {item.subMenu && (
          <MenubarContent className='min-w-fit px-5 py-2 mt-4 grid grid-cols-4 gap-x-5 gap-y-2 bg-neutral-800 z-50 border-none text-white'>
            {item.subMenu.map((subItem) => (
              <Link
                key={subItem.slug}
                href={checkUrl(subItem.slug)}
              >
                <MenubarItem className='cursor-pointer capitalize block text-center'>
                  {subItem.name}
                </MenubarItem>
              </Link>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}

TextMenubar.displayName = 'TextMenubar'

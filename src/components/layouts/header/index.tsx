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
import useScrollPosition from '@/hooks/useScroll'
import { cn } from '@/lib/utils'
import { INavbar } from '@/models/interfaces/navbar'
import { useCountries } from '@/services/query-data'
import { getCookie } from 'cookies-next'
import { Calendar, ChevronDown, Film, Globe, Grid, Home, Menu, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Drawer from '../drawer'
import Account from './account'

const Header = () => {
  const pathname = usePathname()
  const scrollPosition = useScrollPosition()

  const isHomePathname = pathname === '/'
  const isAuthPath = pathname === '/login' || pathname === '/register'

  return (
    <header
      className={cn(
        'w-full h-14 flex fixed items-center justify-between top-0 z-50 transition duration-300',
        !isHomePathname ? 'sticky border-b border-neutral-200 border-opacity-10' : '',
        scrollPosition > 0 ? 'bg-neutral-900/50 backdrop-blur-md' : '',
        isAuthPath ? 'hidden' : '',
      )}
    >
      <HeaderMenubar />
    </header>
  )
}

const HeaderMenubar = React.memo(() => {
  const router = useRouter()
  const { isLogin } = useContextGlobal()

  const [hasToken, setHasToken] = useState(false)
  const [openDialogSearch, setOpenDialogSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data: countries = [] } = useCountries({})

  // Check token
  useEffect(() => {
    const userInfo = getCookie('userVerify')
    const token = userInfo ? JSON.parse(userInfo).token : null

    if (token) {
      setHasToken(true)
      return
    }
    setHasToken(false)
  }, [isLogin])

  const sizeIcon = 18
  const navbarItems: INavbar[] = [
    {
      name: 'Trang chủ',
      icon: (
        <Home
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
      href: '/',
    },
    {
      name: 'Phim lẻ',
      icon: (
        <Film
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
      href: '/phim-le',
    },
    {
      name: 'Phim bộ',
      icon: (
        <Film
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
      href: '/phim-bo',
    },
    {
      name: 'Thể loại',
      subMenu: dataTheLoai,
      icon: (
        <Grid
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
    },
    {
      name: 'Quốc gia',
      subMenu: countries,
      icon: (
        <Globe
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
    },
    {
      name: 'Năm',
      subMenu: dataNamPhatHanh,
      icon: (
        <Calendar
          size={sizeIcon}
          strokeWidth={1.5}
        />
      ),
    },
  ]

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim()

    if (event.key !== 'Enter' || !value) {
      return
    }
    setOpenDialogSearch(false)
    router.push(`/tim-kiem?keyword=${value}`)
  }

  const handleSearchIconClick = () => {
    if (!searchValue) return

    setOpenDialogSearch(false)
    setSearchValue('')
    router.push(`/tim-kiem?keyword=${searchValue}`)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const getUrl = (link: string) => {
    const url = link.startsWith('/') ? link : `/${link}`
    const menuName = navbarItems.find((item) =>
      item.subMenu?.find((subItem) => subItem.slug === link),
    )?.name

    switch (menuName?.toLowerCase()) {
      case 'thể loại':
        return `/the-loai${url}`
      case 'quốc gia':
        return `/quoc-gia${url}`
      case 'năm':
        return `/nam${url}`
      default:
        return url
    }
  }

  return (
    <div className='mx-auto max-w-screen-xl w-full px-[25px] lg:px-10 flex justify-between items-center gap-8'>
      <div className='flex gap-8 h-full items-center'>
        <Link
          href='/'
          className='relative flex items-baseline gap-1.5 text-2xl text-nowrap'
          style={{ fontFamily: 'Vampiro One, system-ui', fontWeight: 400 }}
        >
          <span className='text-primary-color'>Mephim</span>
          <span className='text-xl'>247</span>
        </Link>
        <nav className='flex items-center gap-5 h-full max-w-screen-lg max-md:hidden text-white'>
          <Menubar className='flex gap-3 bg-transparent border-none p-0'>
            {navbarItems.map((menuItem) => (
              <React.Fragment key={menuItem.name}>
                {menuItem.href ? (
                  <Link
                    href={getUrl(menuItem.href)}
                    className={cn('text-base capitalize font-semibold hover:text-primary-color')}
                  >
                    {menuItem.name}
                  </Link>
                ) : (
                  <MenubarMenu>
                    <MenubarTrigger className='p-0 !bg-transparent text-base capitalize font-semibold data-[state=open]:text-primary-color data-[state=closed]:!text-white'>
                      <div className='cursor-pointer flex items-center hover:text-primary-color'>
                        {menuItem.name}
                        <ChevronDown
                          strokeWidth={2}
                          size={16}
                          className='ml-1'
                        />
                      </div>
                    </MenubarTrigger>
                    {menuItem.subMenu && (
                      <MenubarContent
                        className={cn(
                          'min-w-fit px-5 mt-3 grid grid-cols-4 gap-x-5 gap-y-1 bg-neutral-900 z-50 border-none text-current',
                          { 'grid-cols-2 gap-x-3': menuItem.subMenu.length < 6 },
                        )}
                      >
                        {menuItem.subMenu.map((subItem) => (
                          <Link
                            key={subItem.slug}
                            href={getUrl(subItem.slug)}
                          >
                            <MenubarItem className='cursor-pointer capitalize block text-center hover:!bg-inherit hover:!text-yellow-400'>
                              {subItem.name}
                            </MenubarItem>
                          </Link>
                        ))}
                      </MenubarContent>
                    )}
                  </MenubarMenu>
                )}
              </React.Fragment>
            ))}
          </Menubar>
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
            className='text-base max-sm:text-sm text-current hover:no-underline hover:text-primary-color font-semibold p-0'
            onClick={() => router.push('/login')}
          >
            Đăng nhập
          </Button>
        )}
        <Menu
          className='md:hidden cursor-pointer'
          onClick={() => setOpenDrawer(true)}
        />
      </div>

      {/* Mobile menu */}
      <Drawer
        dataMenu={navbarItems}
        open={openDrawer}
        onClose={handleCloseDrawer}
      />

      <DialogCustom
        open={openDialogSearch}
        setOpen={setOpenDialogSearch}
        content={
          <div className='flex items-center'>
            <Input
              placeholder='Tìm kiếm phim, tv shows...'
              autoFocus
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleInputChange(e)}
              className='text-white text-lg bg-transparent p-0 pr-10 border-transparent rounded-none !border-b-[#ccc] focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Search
              size={20}
              className='cursor-pointer -ml-8 hover:text-primary-color'
              onClick={handleSearchIconClick}
            />
          </div>
        }
      />
    </div>
  )
})

HeaderMenubar.displayName = 'HeaderMenubar'

export default Header

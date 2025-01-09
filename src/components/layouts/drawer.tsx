import { cn } from '@/lib/utils'
import { INavbar } from '@/models/interfaces/navbar'
import { ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  dataMenu: INavbar[]
}

export default function Drawer(props: DrawerProps) {
  const { open, onClose, dataMenu } = props
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const activeLink = (link: string) => pathname.endsWith(link)

  const getUrl = (link: string) => {
    const url = link.startsWith('/') ? link : `/${link}`
    const menuName = dataMenu.find((item) =>
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

  const handleClose = () => {
    onClose()
    setOpenSubMenu(null)
  }

  return (
    <div
      className={cn(
        'fixed top-0 right-0 w-full min-h-screen bg-black/80 transition-all duration-300 overflow-hidden invisible',
        { visible: open },
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          'relative ml-auto h-screen pt-3 bg-neutral-900 transition-all duration-500 translate-x-full w-0 overflow-hidden scrollbar-none',
          { 'translate-x-0 w-[260px] overflow-y-auto': open },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <X
          size={20}
          className='cursor-pointer ml-auto mr-5 mb-3 text-gray-400'
          onClick={handleClose}
          xlinkTitle='Đóng'
        />

        {/* Menu chính và sub-menu */}
        {dataMenu.map((menuItem) => (
          <div
            key={menuItem.name}
            className='flex flex-col text-lg font-semibold capitalize border-b border-neutral-800'
          >
            {menuItem.href ? (
              <Link
                href={getUrl(menuItem.href)}
                className={cn(
                  'hover:text-primary-color py-2 px-5 transition-all duration-300 rounded-md flex items-center gap-2',
                  activeLink(menuItem.href) ? 'text-primary-color' : 'text-gray-100',
                )}
                onClick={onClose}
              >
                {menuItem.icon}
                {menuItem.name}
              </Link>
            ) : (
              <>
                <div
                  onClick={() =>
                    setOpenSubMenu(openSubMenu === menuItem.name ? null : menuItem.name)
                  }
                  className='py-2 px-5 flex items-center justify-between hover:text-primary-color transition-all duration-300 cursor-pointer text-gray-100 rounded-md'
                >
                  <p className='flex items-center gap-2'>
                    {menuItem.icon}
                    {menuItem.name}
                  </p>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className={cn(
                      {
                        'rotate-90': openSubMenu === menuItem.name,
                        'rotate-0': openSubMenu !== menuItem.name,
                      },
                      'transition-all duration-300',
                    )}
                  />
                </div>
                {menuItem.subMenu && (
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-500 ease-in-out pl-10 grid grid-cols-2 gap-x-3 text-sm font-normal',
                      {
                        'max-h-0': openSubMenu !== menuItem.name,
                        'max-h-screen': openSubMenu === menuItem.name,
                      },
                    )}
                  >
                    {menuItem.subMenu.map((item) => (
                      <Link
                        key={item.slug}
                        href={getUrl(item.slug)}
                        className={cn(
                          'hover:text-primary-color py-2',
                          activeLink(item.slug) ? 'text-primary-color' : 'text-gray-100',
                        )}
                        onClick={handleClose}
                      >
                        {menuItem.name.includes('Năm') ? `Năm ${item.name}` : item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

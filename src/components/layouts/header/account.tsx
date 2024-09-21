import { useContextGlobal } from '@/components/context-provider'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import isSuccessResponse from '@/helpers/check-response'
import { showToast } from '@/helpers/toast'
import authApi from '@/services/api-client/auth'
import { MenubarSeparator } from '@radix-ui/react-menubar'
import { deleteCookie, getCookie } from 'cookies-next'
import { HistoryIcon, LogOutIcon, User, User as UserIcon } from 'lucide-react'

const Account = () => {
  const context = useContextGlobal()
  const userInfo = getCookie('userVerify') as string
  const username = typeof userInfo !== 'undefined' ? JSON.parse(userInfo).username : null

  const handleLogout = async () => {
    try {
      const res = await authApi.logout()
      if (isSuccessResponse(res)) {
        deleteCookie('userVerify')
        context.setLogin(false)
        return
      }
      showToast({ variant: 'error', title: 'Something went wrong.', description: res.message })
    } catch (error: any) {
      showToast({ variant: 'error', title: 'Something went wrong.', description: error.message })
    }
  }

  return (
    <>
      <Menubar className='bg-transparent border-none'>
        <MenubarMenu>
          <MenubarTrigger className='p-0 !bg-transparent !text-inherit'>
            <UserIcon
              size={20}
              fill='white'
              className='cursor-pointer fill-current hover:text-primary-color'
            />
          </MenubarTrigger>
          <MenubarContent className='grid gap-2 py-2 mr-4 bg-neutral-800 z-50 border-none text-white'>
            <MenubarItem className='cursor-pointer hover:!bg-white hover:!bg-opacity-10 hover:!text-white flex items-center gap-2'>
              <User size={16} />
              {username}
            </MenubarItem>
            <MenubarItem className='cursor-pointer hover:!bg-white hover:!bg-opacity-10 hover:!text-white flex items-center gap-2'>
              <HistoryIcon size={16} />
              Lịch sử xem
            </MenubarItem>
            <MenubarSeparator style={{ backgroundColor: 'gray', height: '1px' }} />
            <MenubarItem
              onClick={handleLogout}
              className='cursor-pointer hover:!bg-white hover:!bg-opacity-10 hover:!text-white flex items-center gap-2'
            >
              <LogOutIcon size={16} />
              Đăng xuất
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}

export default Account

'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { Button } from './ui/button'
import { myWebsite } from '@/constants/domain'
import { QrCode, X } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

const QRCodeButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 750 })
  const [showQRCode, setShowQRCode] = useState(false)

  const handleToggleQRCode = () => {
    setShowQRCode((prev) => !prev)
  }

  return (
    <>
      {!isMobile && (
        <Button
          title='QR Code Mephim247'
          size={'icon'}
          onClick={handleToggleQRCode}
          className='fixed h-[50px] w-[50px] bottom-10 right-10 bg-neutral-800 hover:text-yellow-300 hover:bg-neutral-800 text-white p-3 rounded-[50%] z-50'
        >
          <QrCode size={24} />
        </Button>
      )}
      {showQRCode && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center flex-col transition-all duration-300 z-50'
          onClick={handleToggleQRCode}
        >
          <X
            size={24}
            className='absolute top-5 right-5 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              handleToggleQRCode()
            }}
          />
          <div
            className='bg-white p-5 rounded-md wave-ripple'
            onClick={(e) => e.stopPropagation()}
          >
            <QRCodeSVG
              value={myWebsite}
              title={'Mephim247'}
              size={256}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'M'}
              imageSettings={{
                src: '/icon.png',
                x: undefined,
                y: undefined,
                height: 55,
                width: 55,
                opacity: 1,
                excavate: true,
              }}
            />
          </div>
          <p className='text-white mt-5 text-sm font-medium'>Quét mã QR để truy cập Mephim247</p>
        </div>
      )}
    </>
  )
}

export default QRCodeButton

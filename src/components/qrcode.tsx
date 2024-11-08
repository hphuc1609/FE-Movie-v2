'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { Button } from './ui/button'
import { myWebsite } from '@/constants/domain'
import { QrCode } from 'lucide-react'

const QRCodeButton = () => {
  const [showQRCode, setShowQRCode] = useState(false)

  const handleToggleQRCode = () => {
    setShowQRCode((prev) => !prev)
  }

  return (
    <>
      <Button
        title='QR Code'
        onClick={handleToggleQRCode}
        className='fixed bottom-10 right-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-lg z-50'
      >
        <QrCode size={20} />
      </Button>

      {showQRCode && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center flex-col transition-all duration-300 z-50'
          onClick={handleToggleQRCode}
        >
          <div
            className='bg-white p-5 rounded-md'
            onClick={(e) => e.stopPropagation()}
          >
            <QRCodeSVG
              value={myWebsite}
              title={'Mephim247'}
              size={256}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              imageSettings={{
                src: '/icon.png',
                x: undefined,
                y: undefined,
                height: 50,
                width: 50,
                opacity: 1,
                excavate: true,
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default QRCodeButton

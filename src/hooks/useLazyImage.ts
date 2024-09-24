'use client'
import { useEffect, useState } from 'react'

const useLazyLoadImg = (imgRef: React.RefObject<HTMLImageElement>) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false)

  useEffect(() => {
    const imgElement = imgRef.current
    if (!imgElement) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsImgLoaded(true)
        observer.unobserve(imgElement)
      }
    })

    observer.observe(imgElement)

    return () => {
      observer.unobserve(imgElement)
    }
  }, [imgRef])

  return isImgLoaded
}

export default useLazyLoadImg

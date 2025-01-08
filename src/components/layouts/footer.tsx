'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'
import MyLogo from '../common/logo'

type FooterLinkProps = {
  href: string
  children: React.ReactNode
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link
      href={href}
      className='text-gray-300 text-xs'
    >
      {children}
    </Link>
  </li>
)

type FooterSectionProps = {
  title: string
  links: { href: string; label: string }[]
}

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div>
    <h4 className='text-base font-semibold mb-3 sm:text-left'>{title}</h4>
    <ul className='flex gap-4 items-center justify-center sm:flex-col sm:items-start sm:gap-3'>
      {links.map((link, index) => (
        <FooterLink
          key={index}
          href={link.href}
        >
          {link.label}
        </FooterLink>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  const supportLinks = [
    { href: 'lien-he:;', label: 'Liên Hệ' },
    { href: 'chinh-sach:;', label: 'Chính Sách Bảo Mật' },
    { href: 'cau-hoi:;', label: 'Câu Hỏi Thường Gặp' },
  ]

  const xemPhimLinks = [
    { href: '/phim-le', label: 'Phim Lẻ' },
    { href: '/phim-bo', label: 'Phim Bộ' },
    { href: '/the-loai/hoat-hinh', label: 'Phim Hoạt Hình' },
    { href: '/the-loai/tv-shows', label: 'TV Shows' },
  ]

  const phimHayLinks = [
    { href: '/quoc-gia/trung-quoc', label: 'Phim Trung Quốc' },
    { href: '/quoc-gia/nhat-ban', label: 'Phim Nhật Bản' },
    { href: '/quoc-gia/au-my', label: 'Phim Âu Mỹ' },
    { href: '/quoc-gia/han-quoc', label: 'Phim Hàn Quốc' },
  ]

  return (
    <footer className='relative bg-[#0d0d0d] border-t border-t-gray-100 py-10'>
      <div className='mx-auto max-w-screen-xl px-[25px] lg:px-10'>
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start'>
          {/* Logo */}
          <div className='text-center lg:text-left'>
            <MyLogo />
            <p className='mt-2 text-sm text-gray-300'>Xem phim chất lượng cao, miễn phí</p>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col md:flex-row md:space-x-10 text-center md:text-left mt-6 lg:mt-0'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4'>
              <FooterSection
                title='Xem Phim'
                links={xemPhimLinks}
              />
              <FooterSection
                title='Phim Hay'
                links={phimHayLinks}
              />
              <FooterSection
                title='Thông Tin'
                links={supportLinks}
              />
            </div>
          </div>

          {/* Go to Top */}
          <Button
            aria-label='Go to top'
            size='icon'
            className='mt-6 lg:mt-0 rounded-full h-[50px] w-[50px] bg-primary-color hover:bg-primary-color transition-transform duration-300 hover:scale-110'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp
              size={30}
              color='white'
            />
          </Button>
        </div>

        {/* Copyright */}
        <div className='mt-10 text-center lg:text-right'>
          <span className='block text-xs text-gray-300'>
            Copyright &copy; {new Date().getFullYear()} Mephim247
          </span>
          <p className='mt-2 text-gray-300'>
            “Mephim247 – Trải nghiệm những bộ phim đỉnh cao. Chúc bạn có những phút giây thư giãn
            tuyệt vời!”
          </p>
        </div>
      </div>
    </footer>
  )
}

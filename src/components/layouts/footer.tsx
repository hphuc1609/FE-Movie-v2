'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'

type FooterLinkProps = {
  href: string
  children: React.ReactNode
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link
      href={href}
      className='text-gray-400 hover:text-primary-color transition-all duration-300'
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
    <h4 className='text-lg font-semibold mb-3'>{title}</h4>
    <ul className='space-y-2'>
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
    { href: 'chinh-sach:;', label: 'Chính sách bảo mật' },
    { href: 'cau-hoi:;', label: 'Câu hỏi thường gặp' },
  ]

  const generalLinks = [
    { href: 'gioi-thieu:;', label: 'Giới thiệu' },
    { href: 'lien-he:;', label: 'Liên hệ' },
  ]

  return (
    <footer className='relative bg-[#0d0d0d] border-t border-neutral-900 py-10'>
      <div className='mx-auto max-w-screen-xl px-[25px] lg:px-10'>
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start'>
          {/* Logo */}
          <div className='text-center lg:text-left'>
            <Link
              href='/'
              className='text-2xl flex items-baseline max-md:justify-center gap-1.5 hover:text-white transition-all duration-300'
              style={{ fontFamily: 'Vampiro One, system-ui', fontWeight: 400 }}
            >
              <span className='text-primary-color'>Mephim</span>
              <span className='text-xl'>247</span>
            </Link>
            <p className='mt-2 text-sm text-gray-400'>Xem phim chất lượng cao, miễn phí</p>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col md:flex-row md:space-x-10 text-center md:text-left mt-6 lg:mt-0'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
              <FooterSection
                title='Liên kết'
                links={generalLinks}
              />
              <FooterSection
                title='Hỗ trợ'
                links={supportLinks}
              />
            </div>
          </div>

          {/* Scroll to Top Button */}
          <Button
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

        {/* Copyright & Message */}
        <div className='mt-10 text-center lg:text-right'>
          <span className='block text-xs text-gray-500'>
            &copy; {new Date().getFullYear()} Mephim247. All rights reserved.
          </span>
          <p className='mt-2 text-gray-300'>
            “Mephim247 – Nơi trải nghiệm những bộ phim đỉnh cao. Chúc bạn có những phút giây thư
            giãn tuyệt vời!”
          </p>
        </div>
      </div>
    </footer>
  )
}

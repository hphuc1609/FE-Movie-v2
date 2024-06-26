'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbCustomProps {
  breadCrumb?: any[]
  movieName?: string
}

export default function BreadcrumbCustom(props: BreadcrumbCustomProps) {
  const { breadCrumb, movieName } = props

  return (
    <Breadcrumb>
      <BreadcrumbList className='text-secondary'>
        <BreadcrumbItem>
          <BreadcrumbLink
            href='/'
            className='hover:text-secondary'
          >
            Trang chủ
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadCrumb ? (
          breadCrumb.map((item) => (
            <BreadcrumbItem key={item.position}>
              {!item.isCurrent ? (
                <BreadcrumbLink
                  href={item.slug}
                  className='hover:text-primary-color'
                >
                  {item.name}
                </BreadcrumbLink>
              ) : (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbPage className='text-primary-color'>{item.name}</BreadcrumbPage>
                </>
              )}
            </BreadcrumbItem>
          ))
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className='opacity-70 text-secondary'>{movieName}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

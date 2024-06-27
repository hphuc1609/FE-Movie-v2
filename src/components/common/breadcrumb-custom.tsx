import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BreadCrumb } from '@/models/list-movie'
import Link from 'next/link'

interface BreadcrumbCustomProps {
  breadCrumb: any
}

export default function BreadcrumbCustom(props: BreadcrumbCustomProps) {
  const { breadCrumb } = props
  return (
    <Breadcrumb>
      <BreadcrumbList className='text-secondary'>
        <BreadcrumbItem>
          <Link
            href='/'
            className='hover:text-primary-color capitalize'
          >
            Trang chủ
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {typeof breadCrumb !== 'string' ? (
          breadCrumb?.map((item: BreadCrumb) => (
            <BreadcrumbItem key={item.position}>
              {!item.isCurrent ? (
                <Link
                  href={item.slug || ''}
                  className='hover:text-primary-color capitalize'
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbPage className='opacity-70 text-secondary'>{item.name}</BreadcrumbPage>
                </>
              )}
            </BreadcrumbItem>
          ))
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className='opacity-70 text-secondary'>{breadCrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

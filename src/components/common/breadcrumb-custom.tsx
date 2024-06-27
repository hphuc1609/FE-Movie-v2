import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BreadCrumb } from '@/models/list-movie'

interface BreadcrumbCustomProps {
  breadCrumb: any
}

export default function BreadcrumbCustom(props: BreadcrumbCustomProps) {
  const { breadCrumb } = props
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
        {typeof breadCrumb !== 'string' ? (
          breadCrumb?.map((item: BreadCrumb) => (
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

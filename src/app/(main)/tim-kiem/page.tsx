import Detail from './detail'

interface Params {
  searchParams: { keyword?: string; page?: string }
}

export default function ListPage({ searchParams }: Params) {
  return <Detail searchParams={searchParams} />
}

import SelectInput from '@/components/common/input-form/select'
import { Button } from '@/components/ui/button'
import { dataNamPhatHanh, dataQuocGia, dataTheLoai } from '@/data/category'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

const defaultValues = { category: '', nation: '', year: '' }

const FilterAdvanced = () => {
  const router = useRouter()

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  })

  const onFilterAdvanced = async (data: FieldValues) => {
    const { category, nation, year } = data

    if (!category && !nation && !year) return

    const slug = category || nation || year
    router.push(`/danh-sach/${slug}?page=1`)
  }

  const convertTheLoai = dataTheLoai.map((item) => {
    return { name: `Phim ${item.name}`, slug: item.slug }
  })

  return (
    <div className='flex gap-3'>
      <SelectInput
        name='category'
        control={control}
        data={convertTheLoai}
        placeholder='Thể loại'
      />
      <SelectInput
        name='nation'
        control={control}
        data={dataQuocGia}
        placeholder='Quốc gia'
      />
      <SelectInput
        name='year'
        control={control}
        data={dataNamPhatHanh}
        placeholder='Năm phát hành'
      />
      <Button
        type='submit'
        className='w-[130px] h-[40px] rounded-md bg-primary-color hover:bg-primary-color text-white'
        onClick={handleSubmit(onFilterAdvanced)}
      >
        Tìm kiếm
      </Button>
      <Button
        type='button'
        variant='outline'
        className='w-[130px] h-[40px] rounded-md bg-secondary-color hover:bg-transparent hover:text-white text-white'
        onClick={() => reset()}
      >
        Xóa lọc
      </Button>
    </div>
  )
}

export default FilterAdvanced

import generateYearList from '@/helpers/generate-year'

const movieTypes = [
  { name: 'Phim lẻ', slug: 'phim-le' },
  { name: 'Phim bộ', slug: 'phim-bo' },
  { name: 'Mới cập nhật', slug: 'phim-moi-cap-nhat' },
]

const dataTheLoai = [
  { name: 'Hành động', slug: 'hanh-dong' },
  { name: 'Hài hước', slug: 'hai-huoc' },
  { name: 'Kinh dị', slug: 'kinh-di' },
  { name: 'Phiêu lưu', slug: 'phieu-luu' },
  { name: 'Viễn tưởng', slug: 'vien-tuong' },
  { name: 'Tâm lý', slug: 'tam-ly' },
  { name: 'Tình cảm', slug: 'tinh-cam' },
  { name: 'Hình sự', slug: 'hinh-su' },
  { name: 'Hoạt hình', slug: 'hoat-hinh' },
  { name: 'Gia đình', slug: 'gia-dinh' },
  { name: 'Tài liệu', slug: 'tai-lieu' },
  { name: 'Chính kịch', slug: 'chinh-kich' },
  { name: 'Khoa học', slug: 'khoa-hoc' },
  { name: 'Cổ trang', slug: 'co-trang' },
  { name: 'Bí ẩn', slug: 'bi-an' },
  { name: 'Võ thuật', slug: 'vo-thuat' },
  { name: 'Chiến tranh', slug: 'chien-tranh' },
  { name: 'Học đường', slug: 'hoc-duong' },
  { name: 'Thần thoại', slug: 'than-thoai' },
  { name: 'Phim 18+', slug: 'phim-18' },
  { name: 'Kinh điển', slug: 'kinh-dien' },
  { name: 'TV Shows', slug: 'tv-shows' },
  { name: 'Thể thao', slug: 'the-thao' },
  { name: 'Âm nhạc', slug: 'am-nhac' },
]

const dataQuocGia = [
  { name: 'Âu Mỹ', slug: 'au-my' },
  { name: 'Hàn Quốc', slug: 'han-quoc' },
  { name: 'Nhật Bản', slug: 'nhat-ban' },
  { name: 'Trung Quốc', slug: 'trung-quoc' },
  { name: 'Thái Lan', slug: 'thai-lan' },
  { name: 'Ấn Độ', slug: 'an-do' },
  { name: 'Philippines', slug: 'philippines' },
  { name: 'Hồng Kông', slug: 'hong-kong' },
  { name: 'Pháp', slug: 'phap' },
  { name: 'Đức', slug: 'duc' },
  { name: 'Hà Lan', slug: 'ha-lan' },
  { name: 'Mexico', slug: 'mexico' },
  { name: 'Thụy Điển', slug: 'thuy-dien' },
  { name: 'Đan Mạch', slug: 'dan-mach' },
  { name: 'Thụy Sĩ', slug: 'thuy-si' },
  { name: 'Ukraina', slug: 'ukraina' },
  { name: 'Canada', slug: 'canada' },
  { name: 'Tây Ban Nha', slug: 'tay-ban-nha' },
  { name: 'Ba Lan', slug: 'ba-lan' },
  { name: 'Malaysia', slug: 'malaysia' },
  { name: 'Bồ Đào Nha', slug: 'bo-dao-nha' },
  { name: 'Đài Loan', slug: 'dai-loan' },
  { name: 'Thổ Nhĩ Kỳ', slug: 'tho-nhi-ky' },
  { name: 'Nga', slug: 'nga' },
  { name: 'Úc', slug: 'uc' },
  { name: 'Brazil', slug: 'brazil' },
  { name: 'Ý', slug: 'y' },
  { name: 'Na Uy', slug: 'na-uy' },
  { name: 'Nam Phi', slug: 'nam-phi' },
  { name: 'Châu Phi', slug: 'chau-phi' },
  { name: 'Việt Nam', slug: 'viet-nam' },
  { name: 'Quốc gia khác', slug: 'quoc-gia-khac' },
]

const dataNamPhatHanh = generateYearList(2000).sort((a, b) => b.name.localeCompare(a.name))

export { dataNamPhatHanh, dataQuocGia, dataTheLoai, movieTypes }

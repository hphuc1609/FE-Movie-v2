type CategorySeo = {
  title: string
  description: string
  keywords: string
}

const currentYear = new Date().getFullYear()

export const categorySeo: Record<string, CategorySeo> = {
  phimLe: {
    title: 'Phim Lẻ Hay Tuyển Chọn',
    description: `Phim lẻ mới nhất ${currentYear}, tuyển tập phim lẻ hay tuyển chọn vietsub cập nhật nhanh nhất.`,
    keywords: 'phim lẻ, phim lẻ hay, phim lẻ mới',
  },
  phimBo: {
    title: 'Phim Bộ Đặc Sắc',
    description: `Phim bộ đặc sắc mới ${currentYear}, tuyển tập phim bộ hay đặc sắc vietsub cập nhật nhanh nhất.`,
    keywords: 'phim bộ, phim bộ hay, phim bộ mới',
  },
  hoatHinh: {
    title: 'Phim Hoạt Hình Thiếu Nhi, Hoạt Hình Anime',
    description: `Tuyển tập phim hoạt hình thiếu nhi, phim hoạt hình anime hay nhất ${currentYear}.`,
    keywords: 'phim hoạt hình, phim hoạt hình hay, phim hoạt hình thiếu nhi, phim hoạt hình anime',
  },
  tvShows: {
    title: 'Chương Trình Truyền Hình Hấp Đẫn',
    description: 'Danh sách chương trình truyền hình hấp dẫn từ nhiều thể loại khác nhau.',
    keywords: 'phim truyền hình, chương trình truyền hình, TV shows, series truyền hình',
  },
  kinhDi: {
    title: 'Phim Kinh Dị',
    description: 'Danh sách các bộ phim kinh dị mới nhất, gây cấn và hồi hộp.',
    keywords: 'phim kinh dị, phim kinh dị hay, phim kinh dị mới',
  },
  haiHuoc: {
    title: 'Phim Hài Hước',
    description: `Tuyển tập phim hài hước mới nhất ${currentYear}, cười bể bụng xả stress.`,
    keywords: 'phim hài, phim hài hước, phim hài mới',
  },
  phieuLuu: {
    title: 'Phim Phiêu Lưu',
    description: 'Tuyển tập các bộ phim phiêu lưu mạo hiểm mới nhất, đầy thú vị và giật gân.',
    keywords: 'phim phiêu lưu, phim phiêu lưu hay, phim phiêu lưu mới',
  },
  tamLy: {
    title: 'Phim Tâm Lý',
    description:
      'Danh sách những bộ phim tâm lý mới nhất, sâu sắc, khám phá tâm tư và tình cảm của con người.',
    keywords: 'phim tâm lý, phim tâm lý hay, phim tâm lý mới',
  },
  tinhCam: {
    title: 'Phim Tình Cảm',
    description:
      'Danh sách những câu chuyện tình yêu đẹp và cảm động trong các bộ phim tình cảm mới nhất.',
    keywords: 'phim tình cảm, phim tình yêu, phim tình cảm hay',
  },
  hinhSu: {
    title: 'Phim Hình Sự',
    description: 'Danh sách những bộ phim hình sự mới nhất, hấp dẫn với các vụ án ly kỳ.',
    keywords: 'phim hình sự, phim điều tra, phim hình sự hay',
  },
  giaDinh: {
    title: 'Phim Gia Đình',
    description:
      'Danh sách những bộ phim gia đình mới nhất, mang lại thông điệp tốt đẹp và giá trị nhân văn.',
    keywords: 'phim gia đình, phim gia đình hay, phim cho gia đình',
  },
  taiLieu: {
    title: 'Phim Tài Liệu',
    description:
      'Danh sách những bộ phim tài liệu mới nhất, cung cấp thông tin và kiến thức bổ ích.',
    keywords: 'phim tài liệu, tài liệu hay, phim tài liệu mới',
  },
  coTrang: {
    title: 'Phim Cổ Trang',
    description:
      'Danh sách những bộ phim cổ trang mới nhất, với bối cảnh lịch sử và văn hóa đặc sắc.',
    keywords: 'phim cổ trang, phim cổ trang hay, phim cổ trang mới',
  },
  biAn: {
    title: 'Phim Bí Ẩn',
    description: 'Danh sách những bộ phim bí ẩn mới nhất, với các câu đố và tình tiết bất ngờ.',
    keywords: 'phim bí ẩn, phim bí ẩn hay, phim bí ẩn mới',
  },
  hanhDong: {
    title: 'Phim Hành Động',
    description: 'Danh sách những bộ phim hành động mới nhất, đầy kịch tính và mãn nhãn.',
    keywords: 'phim hành động, phim hành động hay, phim hành động mới',
  },
  vienTuong: {
    title: 'Phim Viễn Tưởng',
    description:
      'Danh sách những bộ phim viễn tưởng mới nhất, với các câu chuyện độc đáo và sáng tạo.',
    keywords: 'phim viễn tưởng, phim viễn tưởng hay, phim viễn tưởng mới',
  },
  chinhKich: {
    title: 'Phim Chính Kịch',
    description:
      'Danh sách những bộ phim chính kịch mới nhất, với cốt truyện sâu sắc và nhân vật phong phú.',
    keywords: 'phim chính kịch, phim chính kịch hay, phim chính kịch mới',
  },
  khoaHoc: {
    title: 'Phim Khoa Học',
    description:
      'Danh sách những bộ phim khoa học mới nhất, khám phá những phát minh và lý thuyết thú vị.',
    keywords: 'phim khoa học, phim khoa học hay, phim khoa học mới',
  },
  chienTranh: {
    title: 'Phim Chiến Tranh',
    description: `Danh sách những bộ phim chiến tranh hay nhất, tuyển chọn phim chiến tranh mới nhất ${currentYear}`,
    keywords: 'phim chiến tranh, phim chiến tranh hay, phim chiến tranh mới',
  },
  voThuat: {
    title: 'Phim Võ Thuật',
    description: `Danh sách những bộ phim võ thuật hay nhất, tuyển chọn phim võ thuật mới nhất ${currentYear}`,
    keywords: 'phim võ thuật, phim võ thuật hay, phim võ thuật mới',
  },
}

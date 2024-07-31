type CategorySeo = {
  title: string
  description: string
  keywords: string
}

// Dữ liệu SEO cho từng thể loại phim
export const categorySeo: Record<string, CategorySeo> = {
  phimLe: {
    title: 'Phim Lẻ Hay Nhất',
    description:
      'Khám phá bộ sưu tập phim lẻ hấp dẫn, từ hành động đến tâm lý, mang đến trải nghiệm điện ảnh tuyệt vời.',
    keywords: 'phim lẻ, phim lẻ hay, phim lẻ mới',
  },
  phimBo: {
    title: 'Phim Bộ Đặc Sắc',
    description: 'Theo dõi những bộ phim bộ hấp dẫn với cốt truyện kịch tính và nhân vật sâu sắc.',
    keywords: 'phim bộ, phim bộ hay, phim bộ mới',
  },
  hoatHinh: {
    title: 'Phim Hoạt Hình Vui Nhộn',
    description:
      'Những bộ phim hoạt hình đáng yêu và vui nhộn cho cả gia đình, mang lại tiếng cười và bài học bổ ích.',
    keywords: 'phim hoạt hình, phim hoạt hình hay, phim hoạt hình cho trẻ em',
  },
  tvShows: {
    title: 'Chương Trình Truyền Hình Hay Nhất',
    description:
      'Khám phá các chương trình truyền hình hấp dẫn từ nhiều thể loại khác nhau, từ hài hước đến kịch tính.',
    keywords: 'chương trình truyền hình, TV shows hay, series truyền hình',
  },
  kinhDi: {
    title: 'Phim Kinh Dị Đỉnh Cao',
    description:
      'Những bộ phim kinh dị gây cấn, khiến bạn không thể rời mắt với những tình tiết hồi hộp và giật gân.',
    keywords: 'phim kinh dị, phim kinh dị hay, phim kinh dị mới',
  },
  haiHuoc: {
    title: 'Những Bộ Phim Hài Hước Không Thể Bỏ Qua',
    description:
      'Cười thả ga với những bộ phim hài hước nhất, từ tình huống dở khóc dở cười đến những nhân vật hài hước.',
    keywords: 'phim hài, phim hài hước, phim hài mới',
  },
  phieuLuu: {
    title: 'Những Cuộc Phiêu Lưu Kỳ Thú',
    description:
      'Tham gia vào những cuộc phiêu lưu mạo hiểm đầy thú vị và hồi hộp qua các bộ phim hấp dẫn.',
    keywords: 'phim phiêu lưu, phim phiêu lưu hay, phim phiêu lưu mới',
  },
  tamLy: {
    title: 'Phim Tâm Lý Đầy Cảm Xúc',
    description: 'Những bộ phim tâm lý sâu sắc khám phá tâm tư và tình cảm của con người.',
    keywords: 'phim tâm lý, phim tâm lý hay, phim tâm lý mới',
  },
  tinhCam: {
    title: 'Những Bộ Phim Tình Cảm Lãng Mạn',
    description: 'Khám phá những câu chuyện tình yêu đẹp và cảm động trong các bộ phim tình cảm.',
    keywords: 'phim tình cảm, phim tình yêu, phim tình cảm hay',
  },
  hinhSu: {
    title: 'Phim Hình Sự Kịch Tính',
    description:
      'Những bộ phim hình sự hấp dẫn với các vụ án ly kỳ và các nhân vật điều tra tài ba.',
    keywords: 'phim hình sự, phim điều tra, phim hình sự hay',
  },
  giaDinh: {
    title: 'Phim Gia Đình Đầy Ý Nghĩa',
    description: 'Những bộ phim gia đình mang lại thông điệp tốt đẹp và giá trị nhân văn.',
    keywords: 'phim gia đình, phim gia đình hay, phim cho gia đình',
  },
  taiLieu: {
    title: 'Phim Tài Liệu Thú Vị',
    description:
      'Những bộ phim tài liệu cung cấp thông tin và kiến thức bổ ích về thế giới xung quanh.',
    keywords: 'phim tài liệu, tài liệu hay, phim tài liệu mới',
  },
  coTrang: {
    title: 'Phim Cổ Trang Đặc Sắc',
    description: 'Những bộ phim cổ trang với bối cảnh lịch sử và văn hóa đặc sắc.',
    keywords: 'phim cổ trang, phim cổ trang hay, phim cổ trang mới',
  },
  biAn: {
    title: 'Phim Bí Ẩn Kỳ Thú',
    description: 'Những bộ phim bí ẩn với các câu đố và tình tiết bất ngờ.',
    keywords: 'phim bí ẩn, phim bí ẩn hay, phim bí ẩn mới',
  },
  hanhDong: {
    title: 'Phim Hành Động Kịch Tính',
    description:
      'Những bộ phim hành động đầy kịch tính và mãn nhãn, với những pha rượt đuổi và chiến đấu nghẹt thở.',
    keywords: 'phim hành động, phim hành động hay, phim hành động mới',
  },
  vienTuong: {
    title: 'Phim Viễn Tưởng Hấp Dẫn',
    description:
      'Khám phá những thế giới viễn tưởng kỳ diệu với các câu chuyện độc đáo và sáng tạo.',
    keywords: 'phim viễn tưởng, phim viễn tưởng hay, phim viễn tưởng mới',
  },
  chinhKich: {
    title: 'Phim Chính Kịch Sâu Sắc',
    description:
      'Những bộ phim chính kịch với cốt truyện sâu sắc và nhân vật phong phú, khám phá những khía cạnh của cuộc sống.',
    keywords: 'phim chính kịch, phim chính kịch hay, phim chính kịch mới',
  },
  khoaHoc: {
    title: 'Phim Khoa Học Thú Vị',
    description:
      'Những bộ phim khoa học khám phá những phát minh và lý thuyết thú vị về vũ trụ và cuộc sống.',
    keywords: 'phim khoa học, phim khoa học hay, phim khoa học mới',
  },
}

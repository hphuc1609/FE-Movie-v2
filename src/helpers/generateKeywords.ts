type Options = {
  type?: string
  genre?: string
  country?: string
  year?: string
}

function generateKeywords(options: Options) {
  const { type, genre, country, year } = options

  const currentYear = new Date().getFullYear()
  let keywords = []

  // Từ khóa chung
  if (type) {
    keywords.push(`${type}`, `${type} tuyển chọn`, `${type} ${currentYear}`, `${type} mới`)
  }

  // Từ khóa theo thể loại
  if (genre) {
    keywords.push(
      `Phim ${genre}`,
      `Xem phim ${genre}`,
      `Phim ${genre} mới`,
      `Phim ${genre} ${currentYear}`,
      `phim hay`,
    )
  }

  // Từ khóa theo quốc gia
  if (country) {
    keywords.push(
      `Phim ${country}`,
      `Xem phim ${country}`,
      `Phim ${country} ${currentYear}`,
      `Phim ${country} mới`,
      `phim hd hay`,
    )
  }

  // Từ khóa theo năm
  if (year) {
    keywords.push(`Phim Năm ${year}`, `Xem phim Năm ${year}`, `phim hot Năm ${year}`)
  }

  return keywords.join(', ')
}

export default generateKeywords

interface YearItem {
  name: string
  slug: string
}

/**
 * Hàm để tạo danh sách năm từ năm bắt đầu đến năm hiện tại
 * @param {number} startYear - Năm bắt đầu (ví dụ: 2000)
 * @returns {YearItem[]} - Mảng các đối tượng năm
 */
function generateYearList(startYear: number): YearItem[] {
  const currentYear = new Date().getFullYear()
  const years: YearItem[] = []

  for (let year = startYear; year <= currentYear; year++) {
    years.push({ name: `${year}`, slug: `nam-${year}` })
  }

  return years
}

export default generateYearList

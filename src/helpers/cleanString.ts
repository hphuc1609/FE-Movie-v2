const cleanString = (str: string) => {
  return str
    .replace(/&quot;/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, '')
    .replace(/\s{2,}/g, ' ')
}

export default cleanString

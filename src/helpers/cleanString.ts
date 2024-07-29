const cleanString = (str: string) => {
  return str
    .replace(/&quot;/g, '') // Remove &quot;
    .replace(/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u1100-\u11FF\uAC00-\uD7AF]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, '')
    .replace(/\s{2,}/g, ' ')
}

export default cleanString

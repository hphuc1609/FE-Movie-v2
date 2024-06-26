interface CustomResponse {
  status: string | boolean
  data?: any
}

const isSuccessResponse = (response: CustomResponse) => {
  if (!response) {
    return false
  }

  const { status } = response
  if (typeof status === 'string' && status !== 'success') {
    return false
  }
  if (typeof status === 'boolean' && !status) {
    return false
  }
  return true
}

export default isSuccessResponse

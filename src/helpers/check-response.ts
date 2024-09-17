const isSuccessResponse = (response: any) => {
  if (!response) return false

  const { status } = response as Response

  if ([400, 401, 403].includes(status)) return false

  if (typeof status === 'string' && status !== 'success') return false

  if (typeof status === 'boolean' && !status) return false

  return true
}

export default isSuccessResponse

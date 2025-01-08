const imageUrl = (item: any, errorImage: boolean) => {
  const url = errorImage ? item.thumb_url : item.poster_url
  return url.startsWith('https') ? url : `${process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE}/${url}`
}

export default imageUrl

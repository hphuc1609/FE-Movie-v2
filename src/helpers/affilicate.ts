const AD_URL = process.env.NEXT_PUBLIC_AD_URL
const AD_INTERVAL = 3600000 // 1 hour in milliseconds

const handleAdClick = () => {
  const lastAdShown = localStorage.getItem('lastAdShown')
  const now = Date.now()

  // Check if the last ad was shown less than an hour ago
  if (!lastAdShown || now - Number(lastAdShown) > AD_INTERVAL) {
    localStorage.setItem('lastAdShown', now.toString())
    window.open(AD_URL, '_blank', 'noopener,noreferrer')
  }
}

export default handleAdClick

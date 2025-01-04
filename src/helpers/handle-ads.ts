const BASE_URL_RIOKUPON = 'https://t.riokupon.me/s114235'

const AD_LINKS = [BASE_URL_RIOKUPON]
const AD_INTERVAL = 3600000 / 2 // 30 minutes

const openRandomAdLink = () => {
  const lastAdShown = sessionStorage.getItem('lastAdShown')
  const now = Date.now()

  // Check if it's time to show the ad
  if (!lastAdShown || now - Number(lastAdShown) > AD_INTERVAL) {
    const randomIndex = Math.floor(Math.random() * AD_LINKS.length)
    const adUrl = AD_LINKS[randomIndex]

    sessionStorage.setItem('lastAdShown', now.toString())
    window.open(adUrl, '_blank', 'noopener,noreferrer')
  }
}

export default openRandomAdLink

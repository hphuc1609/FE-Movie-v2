const scrollToSection = (element: HTMLElement) => {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const duration = 1000 // thời gian cuộn (mili giây)
  let startTime: number | null = null

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime

    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const ease = progress * (2 - progress) // hàm easing

    setTimeout(() => {
      window.scrollTo(0, startPosition + distance * ease)
    }, 500)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

export default scrollToSection

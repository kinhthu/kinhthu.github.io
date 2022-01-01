export const isVisible = el => {
  let rect = el.getBoundingClientRect()

  if (!rect) return true

  const screenHeight = window.innerHeight || document.documentElement.clientHeight
// console.log(el, rect)
  return (
    (rect.top <= 100 && rect.bottom >= 0)
    // || (rect.bottom >= screenHeight && rect.top <= screenHeight)
    // || (rect.top >= 0 && rect.bottom <= screenHeight)
  )
}

export const animateOnScroll = (t) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(isVisible(entry)) {
        entry.target.classList.add('is-visible')
      }
    })
  })

  const targets = t || document.querySelectorAll('.animate-on-scroll')

  targets.forEach(target => observer.observe(target))

}
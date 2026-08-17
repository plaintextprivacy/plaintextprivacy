import { useEffect } from 'react'

const SCROLL_END_DELAY_MS = 700

export const useScrollBarVisibility = () => {
  useEffect(() => {
    let timeoutId: number | undefined

    const handleScroll = () => {
      document.documentElement.classList.add('is-scrolling')

      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling')
      }, SCROLL_END_DELAY_MS)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(timeoutId)
    }
  }, [])
}
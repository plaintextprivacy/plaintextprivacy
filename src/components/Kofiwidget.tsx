// TODO not in use - add to pagelayout under footer if re-adding to site
import { useEffect } from 'react'

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: Record<string, string>) => void
    }
  }
}

const KOFI_OPTIONS = {
  type: 'floating-chat',
  'floating-chat.donateButton.text': 'Donate',
  'floating-chat.donateButton.background-color': '#a4e8d0',
  'floating-chat.donateButton.text-color': '#0c0d0f'
}

const drawWidget = () => {
  window.kofiWidgetOverlay?.draw('plaintextprivacy', KOFI_OPTIONS)
}

export const KofiWidget = () => {
  useEffect(() => {
    // if the global is already available (e.g. strict mode second run), draw immediately
    if (window.kofiWidgetOverlay) {
      drawWidget()
      return
    }

    // if the script tag is already in the DOM, wait for it to load
    const existing = document.querySelector<HTMLScriptElement>('script[src*="overlay-widget.js"]')
    if (existing) {
      existing.addEventListener('load', drawWidget)
      return () => existing.removeEventListener('load', drawWidget)
    }

    // first load — inject the script
    const script = document.createElement('script')
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.async = true
    script.addEventListener('load', drawWidget)
    document.body.appendChild(script)

    // do NOT remove the script on cleanup — the widget manages its own DOM
  }, [])

  return null
}

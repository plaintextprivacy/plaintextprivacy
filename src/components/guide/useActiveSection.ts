import { useEffect, useRef, useState } from 'react'

/**
 * watches a list of section IDs and returns whichever one is currently most visible in the viewport
 * uses IntersectionObserver
 *
 * @param sectionIds - array of element IDs to observe (without the # prefix)
 * @param topOffset - px to subtract from the top of the rootMargin to account for the sticky topbar
 */
export const useActiveSection = (sectionIds: string[], topOffset = 64): string => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  // track which sections are currently intersecting and at what ratio
  const intersectingRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectingRef.current.set(entry.target.id, entry.intersectionRatio)
        })

        // pick the section with the highest visible ratio that is above the midpoint of the viewport
        let bestId = ''
        let bestRatio = -1

        intersectingRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId && bestRatio > 0) {
          // strip the 'section-' prefix we add to DOM ids
          setActiveId(bestId.replace(/^section-/, ''))
        }
      },
      {
        rootMargin: `-${topOffset}px 0px -40% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    // observe every section element
    sectionIds.forEach((id) => {
      const el = document.getElementById(`section-${id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
    // re-run if section IDs change (e.g. guide navigation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')])

  return activeId
}

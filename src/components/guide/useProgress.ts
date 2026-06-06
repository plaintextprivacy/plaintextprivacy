import { useCallback, useState } from 'react'

const STORAGE_PREFIX = 'pg_progress_'

const readFromStorage = (slug: string): Set<string> => {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return new Set<string>(parsed)
  } catch {
    // corrupted entry, start fresh
  }
  return new Set()
}

const writeToStorage = (slug: string, ids: Set<string>): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify([...ids]))
  } catch {
    // localStorage unavailable (private browsing quota, etc.) - fail silently
  }
}

interface UseProgressReturn {
  checkedIds: Set<string>
  isChecked: (id: string) => boolean
  setChecked: (id: string, checked: boolean) => void
  clearProgress: () => void
}

export const useProgress = (slug: string): UseProgressReturn => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => readFromStorage(slug))

  const setChecked = useCallback(
    (id: string, checked: boolean) => {
      setCheckedIds((prev) => {
        const next = new Set(prev)
        checked ? next.add(id) : next.delete(id)
        writeToStorage(slug, next)
        return next
      })
    },
    [slug]
  )

  const isChecked = useCallback((id: string) => checkedIds.has(id), [checkedIds])

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${slug}`)
    } catch {
      /* silent */
    }
    setCheckedIds(new Set())
  }, [slug])

  return { checkedIds, isChecked, setChecked, clearProgress }
}

interface UseTabbedProgressReturn {
  getCheckedIds: (tabId: string) => Set<string>
  isChecked: (tabId: string, itemId: string) => boolean
  setChecked: (tabId: string, itemId: string, checked: boolean) => void
  clearProgress: (tabId: string) => void
}

export const useTabbedProgress = (slug: string): UseTabbedProgressReturn => {
  // each tab gets its own localStorage key
  const tabSlug = (tabId: string) => `${slug}__${tabId}`

  const [tabChecked, setTabChecked] = useState<Record<string, Set<string>>>({})

  const getCheckedIds = useCallback(
    (tabId: string): Set<string> => {
      // lazy load from localStorage on first access per tab
      if (!tabChecked[tabId]) {
        return readFromStorage(tabSlug(tabId))
      }
      return tabChecked[tabId]
    },
    [tabChecked, slug]
  )

  const setChecked = useCallback(
    (tabId: string, itemId: string, checked: boolean) => {
      setTabChecked((prev) => {
        const current = prev[tabId] ?? readFromStorage(tabSlug(tabId))
        const next = new Set(current)
        checked ? next.add(itemId) : next.delete(itemId)
        writeToStorage(tabSlug(tabId), next)
        return { ...prev, [tabId]: next }
      })
    },
    [slug]
  )

  const isChecked = useCallback(
    (tabId: string, itemId: string) => getCheckedIds(tabId).has(itemId),
    [getCheckedIds]
  )

  const clearProgress = useCallback(
    (tabId: string) => {
      try {
        localStorage.removeItem(`${STORAGE_PREFIX}${tabSlug(tabId)}`)
      } catch {
        /* silent */
      }
      setTabChecked((prev) => ({ ...prev, [tabId]: new Set() }))
    },
    [slug]
  )

  return { getCheckedIds, isChecked, setChecked, clearProgress }
}

import React from 'react'

const STORAGE_KEY = 'justjavascript-progress'
const ProgressContext = React.createContext({ progress: {}, isValidating: false })

export function useProgress() {
  return React.useContext(ProgressContext)
}

export const ProgressProvider = ({ children }) => {
  const [progress, updateProgress] = React.useState({})

  React.useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        updateProgress(saved)
      }
    } catch {
      // Reading still works when browser storage is unavailable.
    }
  }, [])

  function setProgress({ episode, progress: episodeProgress, setCompleted }) {
    updateProgress((previous) => {
      const next = { ...previous, [episode]: episodeProgress }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Keep progress for this visit if storage is disabled or full.
      }
      return next
    })
    setCompleted?.()
  }

  return (
    <ProgressContext.Provider value={{ progress, setProgress, isValidating: false }}>
      {children}
    </ProgressContext.Provider>
  )
}

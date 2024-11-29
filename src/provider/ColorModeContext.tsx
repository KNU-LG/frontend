// context/ColorModeContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type ColorModeContextType = {
  colorMode: string
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState(() => {
    const savedMode = localStorage.getItem("colorMode")
    return savedMode || "light"
  })

  const toggleColorMode = () => {
    const newMode = colorMode === "dark" ? "light" : "dark"
    setColorMode(newMode)
    document.documentElement.setAttribute("data-theme", newMode)
    localStorage.setItem("colorMode", newMode)
  }

  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode")
    if (savedMode) {
      setColorMode(savedMode)
      document.documentElement.setAttribute("data-theme", savedMode)
    }
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within an ColorModeProvider")
  }
  return context
}

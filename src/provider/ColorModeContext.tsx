import React, { createContext, useState, ReactNode, useContext } from "react"

type ColorModeContextType = {
  colorMode: string
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState("dark")

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark")
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within an AuthProvider")
  }
  return context
}

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface Position {
  x: number
  y: number
}

interface WidgetPosition {
  position: Position
  widgetName: string
}

type PositionContextType = {
  positions: Record<string, WidgetPosition>
  updatePosition: (widgetId: string, position: Position) => void
  savePositions: () => void
  isLoading: boolean
}

export const PositionContext = createContext<PositionContextType | undefined>(undefined)

export const PositionProvider = ({ children }: { children: ReactNode }) => {
  const [positions, setPositions] = useState<Record<string, WidgetPosition>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedPositions = localStorage.getItem("widgetPositions")
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions))
    }
    setIsLoading(false)
  }, [])

  const updatePosition = (widgetId: string, position: Position) => {
    setPositions((prev) => ({
      ...prev,
      [widgetId]: {
        position,
        widgetName: widgetId.split("-")[1],
      },
    }))
  }

  const savePositions = () => {
    localStorage.setItem("widgetPositions", JSON.stringify(positions))
  }

  return (
    <PositionContext.Provider value={{ positions, updatePosition, savePositions, isLoading }}>
      {children}
    </PositionContext.Provider>
  )
}

export const usePosition = () => {
  const context = useContext(PositionContext)
  if (!context) {
    throw new Error("usePosition must be used within a PositionProvider")
  }
  return context
}

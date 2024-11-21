// context/EditModeContext.tsx
import { createContext, ReactNode, useContext, useState } from "react"

type EditModeContextType = {
  isEditMode: boolean
  setIsEditMode: (mode: boolean) => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

export const useEditMode = () => {
  const context = useContext(EditModeContext)
  if (!context) {
    throw new Error("useEditMode must be used within an EditModeProvider")
  }
  return context
}

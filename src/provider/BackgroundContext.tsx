import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type BackgroundContextType = {
  backgroundImage: string
  updateBackgroundImage: (image: string) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>({
  backgroundImage: "",
  updateBackgroundImage: () => {},
})

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState("")

  useEffect(() => {
    const savedImage = localStorage.getItem("backgroundImage")
    if (savedImage) setBackgroundImage(savedImage)
  }, [])

  const updateBackgroundImage = (newImage: string) => {
    setBackgroundImage(newImage)
    localStorage.setItem("backgroundImage", newImage)
  }

  return (
    <BackgroundContext.Provider value={{ backgroundImage, updateBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackgroundImage = () => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error("useBackgroundMode must be used within an BackgroundProvider")
  }
  return context
}

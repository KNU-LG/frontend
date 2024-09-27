import HomePage from "./pages/home"
import { PositionProvider } from "./provider/PositionContext"

const App = () => {
  return (
    <PositionProvider>
      <HomePage />
    </PositionProvider>
  )
}

export default App

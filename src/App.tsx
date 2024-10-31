import { PositionProvider } from "./provider/PositionContext"
import Routes from "./routes"

const App = () => {
  return (
    <PositionProvider>
      <Routes />
    </PositionProvider>
  )
}

export default App

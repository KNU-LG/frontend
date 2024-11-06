import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PositionProvider } from "./provider/PositionContext"
import Routes from "./routes"

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <Routes />
      </PositionProvider>
    </QueryClientProvider>
  )
}

export default App

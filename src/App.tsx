import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PositionProvider } from "./provider/PositionContext"
import Routes from "./routes"
import Providers from "./provider/Providers"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <Providers>
          <Routes />
        </Providers>
      </PositionProvider>
    </QueryClientProvider>
  )
}

export default App

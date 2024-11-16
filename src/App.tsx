import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Providers from "./provider/Providers"
import Routes from "./routes"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </Providers>
  )
}

export default App

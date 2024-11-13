import { ColorModeProvider } from "./ColorModeContext"
import { useColorMode } from "./ColorModeContext"

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return <ColorModeProvider>{children}</ColorModeProvider>
}

export default Providers

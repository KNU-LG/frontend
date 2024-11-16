import { ColorModeProvider } from "./ColorModeContext"
import { EditModeProvider } from "./EditModeContext"
import { PositionProvider } from "./PositionContext"

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <EditModeProvider>
      <PositionProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
      </PositionProvider>
    </EditModeProvider>
  )
}

export default Providers

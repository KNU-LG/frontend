import { ColorModeProvider } from "./ColorModeContext"
import { DimmingProvider } from "./DimmingProvider"
import { EditModeProvider } from "./EditModeContext"
import { PositionProvider } from "./PositionContext"

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <DimmingProvider>
      <EditModeProvider>
        <PositionProvider>
          <ColorModeProvider>{children}</ColorModeProvider>
        </PositionProvider>
      </EditModeProvider>
    </DimmingProvider>
  )
}

export default Providers

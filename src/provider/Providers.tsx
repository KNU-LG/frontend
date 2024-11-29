import { BackgroundProvider } from "./BackgroundContext"
import { ColorModeProvider } from "./ColorModeContext"
import { DimmingProvider } from "./DimmingProvider"
import { EditModeProvider } from "./EditModeContext"
import { PositionProvider } from "./PositionContext"

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BackgroundProvider>
      <DimmingProvider>
        <EditModeProvider>
          <PositionProvider>
            <ColorModeProvider>{children}</ColorModeProvider>
          </PositionProvider>
        </EditModeProvider>
      </DimmingProvider>
    </BackgroundProvider>
  )
}

export default Providers

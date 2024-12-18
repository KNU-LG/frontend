import styled from "@emotion/styled"

type ColorModeToggleProps = {
  colorMode: string
  setColorMode: () => void
}

type ScreenToggleProps = {
  activeScreen: "widget" | "image"
  setActiveScreen: () => void
}

type WidgetToggleProps = {
  activeWidget: "calendar" | "clock" | "music" | "weather"
  setActiveWidget: (widget: "calendar" | "clock" | "music" | "weather") => void
}

export const ColorModeToggleButton = ({ colorMode, setColorMode }: ColorModeToggleProps) => {
  return (
    <ToggleWrapper>
      <ColorModeButton colorMode={colorMode} onClick={setColorMode}>
        <ColorModeSlider colorMode={colorMode} />
        <TextGroup>
          <ColorModeText colorMode={colorMode} isActive={colorMode === "light"}>
            Light
          </ColorModeText>
          <ColorModeText colorMode={colorMode} isActive={colorMode === "dark"}>
            Dark
          </ColorModeText>
        </TextGroup>
      </ColorModeButton>
    </ToggleWrapper>
  )
}

export const ScreenToggleButton = ({ activeScreen, setActiveScreen }: ScreenToggleProps) => {
  return (
    <ToggleWrapper>
      <ScreenButton disabled={true}>
        <ScreenSlider activeScreen={activeScreen} />
        <TextGroup>
          <ScreenText isActive={activeScreen === "widget"} onClick={setActiveScreen}>
            Widget
          </ScreenText>
          <ScreenText isActive={activeScreen === "image"} onClick={setActiveScreen}>
            Image
          </ScreenText>
        </TextGroup>
      </ScreenButton>
    </ToggleWrapper>
  )
}

export const WidgetToggleButton = ({ activeWidget, setActiveWidget }: WidgetToggleProps) => {
  return (
    <ToggleWrapper>
      <WidgetButton>
        <WidgetSlider activeWidget={activeWidget} />
        <TextGroup>
          <WidgetText
            isActive={activeWidget === "calendar"}
            onClick={() => setActiveWidget("calendar")}
          >
            Calendar
          </WidgetText>
          <WidgetText isActive={activeWidget === "clock"} onClick={() => setActiveWidget("clock")}>
            Clock
          </WidgetText>
          <WidgetText isActive={activeWidget === "music"} onClick={() => setActiveWidget("music")}>
            Music
          </WidgetText>
          <WidgetText
            isActive={activeWidget === "weather"}
            onClick={() => setActiveWidget("weather")}
          >
            Weather
          </WidgetText>
        </TextGroup>
      </WidgetButton>
    </ToggleWrapper>
  )
}

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 340px;
`

const ColorModeButton = styled.button<{ colorMode: string }>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${(props) =>
    props.colorMode === "dark" ? "var(--color-white)" : "var(--color-dark-gray)"};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
`

const ColorModeSlider = styled.div<{ colorMode: string }>`
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  width: calc(50% - 4px);
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.colorMode === "dark" ? "calc(100% - 2px)" : "1px")});
  background-color: ${(props) =>
    props.colorMode === "dark" ? "var(--color-dark-gray)" : "var(--color-white)"};
  transition: transform 0.3s ease;
`

const ScreenButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: var(--color-white);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const ScreenSlider = styled.div<{ activeScreen: "widget" | "image" }>`
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  width: calc(50% - 4px);
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--color-red);
  transform: translateX(
    ${(props) => (props.activeScreen === "image" ? "calc(100% - 2px)" : "1px")}
  );
  transition: transform 0.3s ease;
`

const WidgetButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: var(--color-white);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
`

const WidgetSlider = styled.div<{ activeWidget: string }>`
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  width: calc(25% - 4px);
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--color-red);
  transform: translateX(
    ${(props) => {
      switch (props.activeWidget) {
        case "calendar":
          return "1px"
        case "clock":
          return "calc(100% + 1px)"
        case "music":
          return "calc(200% + 1px)"
        case "weather":
          return "calc(300% + 1px)"
        default:
          return "1px"
      }
    }}
  );
  transition: transform 0.3s ease;
`

const TextGroup = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ColorModeText = styled.span<{ colorMode: string; isActive: boolean }>`
  font-size: 16px;
  font-weight: 750;
  color: ${(props) =>
    props.isActive
      ? props.colorMode === "dark"
        ? "var(--color-white)"
        : "var(--color-dark-gray)"
      : props.colorMode === "dark"
        ? "var(--color-dark-gray)"
        : "var(--color-white)"};
  transition: color 0.3s ease;
  z-index: 1;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScreenText = styled.span<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 750;
  color: ${(props) => (props.isActive ? "var(--color-white)" : "var(--color-dark-gray)")};
  transition: color 0.3s ease;
  z-index: 1;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const WidgetText = styled.span<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 750;
  color: ${(props) => (props.isActive ? "var(--color-white)" : "var(--color-dark-gray)")};
  transition: color 0.3s ease;
  z-index: 1;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

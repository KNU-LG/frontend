import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { WidgetToggleButton } from "../../components/Button/ToggleButton"

import { useEffect, useRef, useState } from "react"
import BackButton from "../../components/Button/BackButton"
import { RouterPath } from "../../routes/path"
import { Widget } from "../../types"
import Calendar from "./components/Calendar"
import Clock from "./components/Clock"
import Music from "./components/Music"
import Weather from "./components/Weather"

const Widgets = () => {
  const navigate = useNavigate()
  const [activeWidget, setActiveWidget] = useState<"calendar" | "clock" | "music" | "weather">(
    "calendar",
  )

  const calendarRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLDivElement>(null)
  const weatherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const refs: Record<typeof activeWidget, React.RefObject<HTMLDivElement>> = {
      calendar: calendarRef,
      clock: clockRef,
      music: musicRef,
      weather: weatherRef,
    }
    const ref = refs[activeWidget]
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeWidget])

  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  const handleWidgetSelect = (widget: Widget) => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    const updatedWidgets = [...existingWidgets, widget]
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))

    navigate(RouterPath.widgetsSetting)
  }

  return (
    <Container>
      <BackButton handleBack={handleBack} />
      <IconWrapper>
        <WidgetToggleButton activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
      </IconWrapper>
      <CustomFormWrapper>
        <CustomForm ref={calendarRef}>
          <WidgetTitle>Calendar</WidgetTitle>
          <WidgetContainer>
            <Calendar handleWidgetSelect={handleWidgetSelect} />
          </WidgetContainer>
        </CustomForm>
        <CustomForm ref={clockRef}>
          <WidgetTitle>Clock</WidgetTitle>
          <WidgetContainer>
            <Clock handleWidgetSelect={handleWidgetSelect} />
          </WidgetContainer>
        </CustomForm>
        <CustomForm ref={musicRef}>
          <WidgetTitle>Music</WidgetTitle>
          <WidgetContainer>
            <Music />
          </WidgetContainer>
        </CustomForm>
        <CustomForm ref={weatherRef}>
          <WidgetTitle>Weather</WidgetTitle>
          <WidgetContainer>
            <Weather />
          </WidgetContainer>
        </CustomForm>
      </CustomFormWrapper>
    </Container>
  )
}

export default Widgets

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 40px;
`
const CustomFormWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const CustomForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: auto;
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const WidgetContainer = styled.div`
  width: 80%;
  height: 70%;
  min-height: 200px;
  display: flex;
  margin: 0 0 20px 0;
  border: 1px solid gray;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const WidgetTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #616161;
  margin: 20px;
`

const IconWrapper = styled.div`
  position: fixed;
  top: 25px;
  z-index: 10;
  align-items: center;
  width: auto;
  height: auto;
  cursor: pointer;
`

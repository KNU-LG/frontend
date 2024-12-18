import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import defaultBackground from "../../../assets/defaultBackground.svg"
import { Calendar } from "../../../components/Widgets/Calendar"
import { Clock } from "../../../components/Widgets/Clock"
import { useBackgroundImage } from "../../../provider/BackgroundContext"
import { Widget } from "../../../types"

const HomeUI = () => {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const { backgroundImage } = useBackgroundImage()

  useEffect(() => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    setWidgets(existingWidgets)
  }, [])

  return (
    <Container backgroundImage={backgroundImage}>
      {widgets.map((widget) => {
        switch (widget.type) {
          case "Calendar":
            return (
              <Calendar
                key={`Calendar-${widget.key}-${widget.size}`}
                size={widget.size}
                widgetKey={widget.key}
              />
            )
          case "Clock":
            return (
              <Clock
                key={`Clock-${widget.key}-${widget.size}`}
                size={widget.size}
                widgetKey={widget.key}
              />
            )
          default:
            return null
        }
      })}
    </Container>
  )
}

export default HomeUI

const Container = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackground})`};
  background-size: cover;
  background-position: center;
`

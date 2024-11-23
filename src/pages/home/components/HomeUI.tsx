import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { Calendar } from "../../../components/Widgets/Calendar"
import { Clock } from "../../../components/Widgets/Clock"
import { Widget } from "../../../types"

const HomeUI = () => {
  const [currentTime, setCurrentTime] = useState("")
  const [widgets, setWidgets] = useState<Widget[]>([])

  useEffect(() => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    setWidgets(existingWidgets)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const seoulTime = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(now)
      setCurrentTime(seoulTime)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <TimeDisplay>{currentTime}</TimeDisplay>
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
            return <Clock key={widget.key} />
          default:
            return null
        }
      })}
    </div>
  )
}

export default HomeUI

const TimeDisplay = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

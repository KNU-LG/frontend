import { useEffect, useState } from "react"
import { DragCon } from "./DragCon"

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState("")

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
    <DragCon name="Clock" widgetHeight={100} widgetWidth={100} widgetKey={123}>
      <h1>{currentTime}</h1>
    </DragCon>
  )
}

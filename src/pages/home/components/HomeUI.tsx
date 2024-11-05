import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { Calendar } from "../../../components/Widgets/Calendar"
import { Clock } from "../../../components/Widgets/Clock"

const HomeUI = () => {
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
    <div>
      <TimeDisplay>{currentTime}</TimeDisplay>
      <Clock />
      <Calendar />
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

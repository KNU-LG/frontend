import React from "react"
import styled from "@emotion/styled"
import { useState, useEffect } from "react"
import { Clock } from "../../components/Widgets/Clock"
import { Calendar } from "../../components/Widgets/Calendar"
import { Button } from "@chakra-ui/react"
import { usePosition } from "../../provider/PositionContext"

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState("")
  const { savePositions } = usePosition()

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

    updateTime() // 초기 시간 업데이트
    const timer = setInterval(updateTime, 1000) // 1초마다 시간 업데이트

    return () => clearInterval(timer) // 컴포넌트 언마운트 시 타이머 정리
  }, [])

  return (
    <Wrapper>
      <Icon className="material-icons">settings</Icon>
      <TimeDisplay>{currentTime}</TimeDisplay>
      <Clock />
      <Calendar />
      <SaveButton onClick={savePositions}>save</SaveButton>
    </Wrapper>
  )
}

export default HomePage

const Icon = styled.i`
  display: flex;
  align-items: flex-start;
  height: auto;
  margin: 0;
  padding: 0;
  font-size: 50px; /* 필요에 따라 조정 */
  line-height: 1; /* 기본 line-height를 1로 설정 */
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
`

const TimeDisplay = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SaveButton = styled(Button)`
  width: 50%;
  height: 10%;
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
  display: flex;
`

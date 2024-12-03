import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useDeleteClock } from "../../api/clock/useDeleteClock" // 이 API 함수가 있다고 가정
import { useEditMode } from "../../provider/EditModeContext"
import { DragCon } from "./DragCon"

type ClockProps = {
  size: "L" | "M" | "S"
  widgetKey: number
}

export const Clock = ({ size, widgetKey }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { isEditMode } = useEditMode()
  const { mutate, status } = useDeleteClock(widgetKey)

  const dimensions = {
    L: { width: 200, height: 130 },
    M: { width: 150, height: 100 },
    S: { width: 100, height: 80 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      mutate(widgetKey, {
        onSuccess: () => {
          window.location.reload()
        },
      })
    }, 500)
  }

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
    <DragCon
      name="Clock"
      widgetHeight={widgetHeight}
      widgetWidth={widgetWidth}
      widgetKey={widgetKey}
    >
      <FadeWrapper isDeleting={isDeleting}>
        {isEditMode && (
          <DeleteButton onClick={handleDelete} disabled={status === "pending"}>
            {status === "pending" ? "⏳" : "✖"}
          </DeleteButton>
        )}
        <h1>{currentTime}</h1>
      </FadeWrapper>
    </DragCon>
  )
}

const FadeWrapper = styled.div<{ isDeleting: boolean }>`
  opacity: ${(props) => (props.isDeleting ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
`

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border: none;
  background: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: darkred;
  }
`

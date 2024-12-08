type ClockProps = {
  size: "L" | "M" | "S"
  widgetKey: number
}

import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useDeleteClock } from "../../api/clock/useDeleteClock"
import { useEditMode } from "../../provider/EditModeContext"
import { DragCon } from "./DragCon"

export const Clock = ({ size, widgetKey }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { isEditMode } = useEditMode()
  const { mutate, status } = useDeleteClock(widgetKey)

  const dimensions = {
    L: { width: 280, height: 160 },
    M: { width: 220, height: 130 },
    S: { width: 160, height: 100 },
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
      <ClockWrapper isDeleting={isDeleting}>
        {isEditMode && (
          <DeleteButton onClick={handleDelete} disabled={status === "pending"}>
            {status === "pending" ? "⏳" : "✖"}
          </DeleteButton>
        )}
        <ClockContent size={size}>
          <ClockTime size={size}>{currentTime}</ClockTime>
          <ClockDate size={size}>
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ClockDate>
        </ClockContent>
      </ClockWrapper>
    </DragCon>
  )
}

const ClockWrapper = styled.div<{ isDeleting: boolean }>`
  opacity: ${(props) => (props.isDeleting ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--color-white), #f0f0f0);
  border-radius: 15px;
  box-shadow:
    5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`

const ClockContent = styled.div<{ size: "L" | "M" | "S" }>`
  text-align: center;
  font-family: "Inter", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.size === "S" ? "5px" : "8px")};
`

const ClockTime = styled.div<{ size: "L" | "M" | "S" }>`
  font-weight: 800;
  color: #2d3748;
  width: auto;
  font-size: ${(props) => (props.size === "S" ? "24px" : props.size === "L" ? "36px" : "32px")};
  letter-spacing: 3px;
  margin-top: ${(props) => (props.size === "S" ? "0px" : props.size === "L" ? "15px" : "8px")};
`

const ClockDate = styled.div<{ size: "L" | "M" | "S" }>`
  color: #718096;
  width: auto;
  font-size: ${(props) => (props.size === "S" ? "14px" : props.size === "L" ? "20px" : "16px")};
`

const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #ef4444;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: #dc2626;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

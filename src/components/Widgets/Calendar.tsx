// types.ts
type CalendarProp = {
  size: "L" | "M" | "S"
  widgetKey: number
}

// Calendar.tsx
import styled from "@emotion/styled"
import { useState } from "react"
import { useDeleteCalendar } from "../../api/calendar/useDeleteCalendar"
import { useGetSchedule } from "../../api/schedule/useGetSchedule"
import { useEditMode } from "../../provider/EditModeContext"
import { DragCon } from "./DragCon"
import { Modal } from "./Modal"

export const Calendar = ({ size, widgetKey }: CalendarProp) => {
  const { isEditMode } = useEditMode()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { data } = useGetSchedule(widgetKey)
  const { mutate, status } = useDeleteCalendar(widgetKey)

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

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <DragCon
        name="Calendar"
        widgetHeight={widgetHeight}
        widgetWidth={widgetWidth}
        widgetKey={widgetKey}
      >
        <CalendarWrapper isDeleting={isDeleting}>
          {isEditMode && (
            <DeleteButton onClick={handleDelete} disabled={status === "pending"}>
              {status === "pending" ? "⏳" : "✖"}
            </DeleteButton>
          )}
          <CalendarContainer onClick={() => !isEditMode && setIsModalOpen(true)}>
            <EventList size={size}>
              {data?.data?.map((schedule) => (
                <EventItem key={schedule.id} size={size}>
                  <EventDate>{formatDate(schedule.date)}</EventDate>
                  <EventTitle>{schedule.title}</EventTitle>
                  <EventContent>{schedule.content}</EventContent>
                </EventItem>
              ))}
            </EventList>
          </CalendarContainer>
        </CalendarWrapper>
      </DragCon>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Calendar Details"
        widgetKey={widgetKey}
        scheduleList={data?.data}
      />
    </>
  )
}

const CalendarWrapper = styled.div<{ isDeleting: boolean }>`
  opacity: ${(props) => (props.isDeleting ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--color-white), #f0f0f0);
  border-radius: 15px;
  box-shadow:
    5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.8);
  overflow: hidden;
`

const CalendarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const EventList = styled.div<{ size: "L" | "M" | "S" }>`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => (props.size === "S" ? "5px" : "8px")};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
  width: 100%;
  height: 100%;
`

const EventItem = styled.div<{ size: "L" | "M" | "S" }>`
  padding: ${(props) => (props.size === "S" ? "0.3rem" : "0.5rem")};
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.2s;
  max-width: 100%;
  max-height: 100%;

  &:hover {
    transform: translateX(2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const EventDate = styled.div`
  font-size: 15px;
  color: #718096;
  height: auto;
`

const EventTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  margin: 5px 0;
`
const EventContent = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
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
`

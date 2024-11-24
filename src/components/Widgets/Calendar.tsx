import styled from "@emotion/styled"
import { useState } from "react"
import { useDeleteCalendar } from "../../api/calendar/useDeleteCalendar"
import { useGetSchedule } from "../../api/schedule/useGetSchedule"
import { useEditMode } from "../../provider/EditModeContext"
import { DragCon } from "./DragCon"
import { Modal } from "./Modal"

type CalendarProp = {
  size: "L" | "M" | "S"
  widgetKey: number
}
export const Calendar = ({ size, widgetKey }: CalendarProp) => {
  const { isEditMode } = useEditMode()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { data } = useGetSchedule(widgetKey)

  const { mutate, status } = useDeleteCalendar(widgetKey)

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
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const dimensions = {
    L: { width: 200, height: 200 },
    M: { width: 150, height: 150 },
    S: { width: 100, height: 100 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return (
    <>
      <DragCon
        name="Calendar"
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
          <Wrapper onClick={() => !isEditMode && setIsModalOpen(true)}>
            <ContentContainer>
              {data.data.map((schedule) => (
                <ScheduleItem key={schedule.id}>
                  <ScheduleDate>{formatDate(schedule.date)}</ScheduleDate>
                  <ScheduleTitle>{schedule.title}</ScheduleTitle>
                </ScheduleItem>
              ))}
            </ContentContainer>
          </Wrapper>
        </FadeWrapper>
      </DragCon>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Calendar Details"
        widgetKey={widgetKey}
        scheduleList={data.data}
      />
    </>
  )
}

const FadeWrapper = styled.div<{ isDeleting: boolean }>`
  opacity: ${(props) => (props.isDeleting ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
`

const Wrapper = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
`

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 2px;
  }
`

const ScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px;
  height: auto;
  border: 1px solid #ddd;
  &:last-child {
    margin-bottom: 0;
  }
`

const ScheduleDate = styled.p`
  font-size: 12px;
  font-weight: 500;
`

const ScheduleTitle = styled.h2`
  font-size: 15px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

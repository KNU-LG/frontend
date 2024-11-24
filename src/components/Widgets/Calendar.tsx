import styled from "@emotion/styled"
import { useState } from "react"
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
  const { data } = useGetSchedule(widgetKey)

  const handleClick = () => {
    if (!isEditMode) {
      setIsModalOpen(true)
    }
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
        <Wrapper onClick={handleClick}>
          <ContentContainer>
            {data.data.map((schedule) => (
              <ScheduleItem key={schedule.id}>
                <ScheduleDate>{formatDate(schedule.date)}</ScheduleDate>
                <ScheduleTitle>{schedule.title}</ScheduleTitle>
              </ScheduleItem>
            ))}
          </ContentContainer>
        </Wrapper>
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

  /* 스크롤바 스타일링 */
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

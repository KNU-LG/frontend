import styled from "@emotion/styled"
import { usePostCalendar } from "../../../api/calendar/usePostCalendar"
import { CalendarUI } from "../../../components/WidgetsUI/CalendarUI"
import { Widget } from "../../../types"

type WidgetProps = {
  handleWidgetSelect: (widget: Widget) => void
}

const Calendar = ({ handleWidgetSelect }: WidgetProps) => {
  const { mutate } = usePostCalendar()

  return (
    <WidgetWrapper>
      <CalendarUI
        size="L"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "L",
              },
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Calendar", size: "L", key: data.data.id })
              },
            },
          )
        }}
      />
      <CalendarUI
        size="M"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "M",
              },
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Calendar", size: "M", key: data.data.id })
              },
            },
          )
        }}
      />
      <CalendarUI
        size="S"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "S",
              },
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Calendar", size: "S", key: data.data.id })
              },
            },
          )
        }}
      />
    </WidgetWrapper>
  )
}

export default Calendar

const WidgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

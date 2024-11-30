import styled from "@emotion/styled"
import { usePostClock } from "../../../../api/clock/usePostClock"
import { ClockUI } from "../../../../components/WidgetsUI/ClockUI"
import { Widget } from "../../../../types"

type WidgetProps = {
  handleWidgetSelect: (widget: Widget) => void
}
const Clock = ({ handleWidgetSelect }: WidgetProps) => {
  const { mutate } = usePostClock()

  return (
    <WidgetWrapper>
      <ClockUI
        size="L"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "L",
              },
              timezone: "UTC+9",
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Clock", size: "L", key: data.data.id })
              },
            },
          )
        }}
      />
      <ClockUI
        size="M"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "M",
              },
              timezone: "UTC+9",
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Clock", size: "M", key: data.data.id })
              },
            },
          )
        }}
      />
      <ClockUI
        size="S"
        onClick={() => {
          mutate(
            {
              settingCommon: {
                positionX: 0,
                positionY: 0,
                size: "S",
              },
              timezone: "UTC+9",
            },
            {
              onSuccess: (data) => {
                console.log("서버로부터 받은 데이터:", data)
                handleWidgetSelect({ type: "Clock", size: "S", key: data.data.id })
              },
            },
          )
        }}
      />
    </WidgetWrapper>
  )
}
export default Clock

const WidgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

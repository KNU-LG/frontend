import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { usePostCalendar } from "../../api/calendar/usePostCalendar"
import { CalendarUI } from "../../components/WidgetsUI/CalendarUI"
import { RouterPath } from "../../routes/path"
import { Widget } from "../../types"

const Widgets = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  const { mutate } = usePostCalendar()

  const handleWidgetSelect = (widget: Widget) => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    const updatedWidgets = [...existingWidgets, widget]
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))

    navigate(RouterPath.widgetsSetting)
  }

  return (
    <div>
      <IconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </IconWrapper>
      <Container>
        <Title>Calendar</Title>
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
      </Container>
    </div>
  )
}

export default Widgets

const Container = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  margin: 20px 0;
  border: 1px solid gray;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`
const WidgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
`
const IconWrapper = styled.div`
  position: absolute;
  flex-direction: column;
  gap: 5px;
  font-size: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
`

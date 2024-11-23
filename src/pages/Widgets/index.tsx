import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { CalendarUI } from "../../components/WidgetsUI/CalendarUI"
import { RouterPath } from "../../routes/path"
import { Widget } from "../../types"

const Widgets = () => {
  const navigate = useNavigate()

  const handleWidgetSelect = (widget: Widget) => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    const updatedWidgets = [...existingWidgets, widget]
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))
    navigate(RouterPath.widgetsSetting)
  }

  return (
    <div>
      <Container>
        <Title>Calendar</Title>
        <WidgetWrapper>
          <CalendarUI
            size="L"
            onClick={() =>
              handleWidgetSelect({ type: "Calendar", size: "L", key: `Calendar-L-${Date.now()}` })
            }
          />
          <CalendarUI
            size="M"
            onClick={() =>
              handleWidgetSelect({ type: "Calendar", size: "M", key: `Calendar-M-${Date.now()}` })
            }
          />
          <CalendarUI
            size="S"
            onClick={() =>
              handleWidgetSelect({ type: "Calendar", size: "S", key: `Calendar-S-${Date.now()}` })
            }
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

import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

import { RouterPath } from "../../routes/path"
import { Widget } from "../../types"
import Calendar from "./components/Calendar"

const Widgets = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  const handleWidgetSelect = (widget: Widget) => {
    const existingWidgets = JSON.parse(localStorage.getItem("widgets") || "[]")
    const updatedWidgets = [...existingWidgets, widget]
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))

    navigate(RouterPath.widgetsSetting)
  }

  return (
    <Wrapper>
      <IconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </IconWrapper>
      <Container>
        <Title>Calendar</Title>
        <Calendar handleWidgetSelect={handleWidgetSelect} />
      </Container>
    </Wrapper>
  )
}

export default Widgets

const Wrapper = styled.div`
  width: 90vw;
  height: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  margin: 20px 0;
  border: 1px solid gray;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

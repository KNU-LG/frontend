import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { WidgetToggleButton } from "../../components/Button/ToggleButton"

import { RouterPath } from "../../routes/path"
import { Widget } from "../../types"
import Calendar from "./components/Calendar"
import Clock from "./components/Clock"

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
    <Container>
      <BackIconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </BackIconWrapper>
      <IconWrapper>
        <WidgetToggleButton />
      </IconWrapper>
      <CustomForm>
        <WidgetTitle>Calendar</WidgetTitle>
        <WidgetContainer>
          <Calendar handleWidgetSelect={handleWidgetSelect} />
        </WidgetContainer>
      </CustomForm>
      <CustomForm>
        <WidgetTitle>Clock</WidgetTitle>
        <WidgetContainer>
          <Clock handleWidgetSelect={handleWidgetSelect} />
        </WidgetContainer>
      </CustomForm>
    </Container>
  )
}

export default Widgets

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding-top: 300px;
  background-color: #f2f2f2;
`

const CustomForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: auto;
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const WidgetContainer = styled.div`
  width: 80%;
  height: 70%;
  display: flex;
  margin: 20px 0;
  border: 1px solid gray;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const WidgetTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #616161;
  margin: 20px;
`
const BackIconWrapper = styled.div`
  position: fixed;
  flex-direction: column;
  gap: 5px;
  font-size: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
`

const IconWrapper = styled.div`
  position: fixed;
  top: 25px;
  z-index: 10;
  align-items: center;
  width: auto;
  height: auto;
  cursor: pointer;
`

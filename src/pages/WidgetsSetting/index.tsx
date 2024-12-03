import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import BackButton from "../../components/Button/BackButton"
import { RouterPath } from "../../routes/path"
import HomeUI from "../Home/components/HomeUI"
import { WidgetEditor } from "./components/WidgetEditor"

const WidgetsSetting = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  return (
    <Wrapper>
      <BackButton handleBack={handleBack} />
      <HomeUI />
      <WidgetEditor />
    </Wrapper>
  )
}

export default WidgetsSetting

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`

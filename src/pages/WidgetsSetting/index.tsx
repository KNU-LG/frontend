import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
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
      <IconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </IconWrapper>
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

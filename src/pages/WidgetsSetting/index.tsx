import styled from "@emotion/styled"
import HomeUI from "../Home/components/HomeUI"
import { WidgetEditor } from "./components/WidgetEditor"

const WidgetsSetting = () => {
  return (
    <Wrapper>
      <HomeUI />
      <WidgetEditor />
    </Wrapper>
  )
}

export default WidgetsSetting

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`

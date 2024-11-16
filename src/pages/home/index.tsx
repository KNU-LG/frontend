import { Button } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Settings } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { usePosition } from "../../provider/PositionContext"
import { RouterPath } from "../../routes/path"
import HomeUI from "./components/HomeUI"

const HomePage = () => {
  const { savePositions } = usePosition()
  const navigate = useNavigate()

  return (
    <Wrapper>
      <SettingIcon className="material-icons" onClick={() => navigate(RouterPath.settings)} />
      <HomeUI />
      <SaveButton onClick={savePositions}>save</SaveButton>
    </Wrapper>
  )
}

export default HomePage

const SettingIcon = styled(Settings)`
  display: flex;
  align-items: flex-start;
  height: auto;
  margin: 0;
  padding: 0;
  font-size: 50px;
  line-height: 1;
  cursor: pointer;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
`

const SaveButton = styled(Button)`
  width: 50%;
  height: 10%;
  font-size: 20px;
  color: white;
  border: 1px solid white;
  margin-bottom: 10px;
  display: flex;
  background-color: gray;
`

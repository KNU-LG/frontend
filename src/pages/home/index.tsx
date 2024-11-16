import styled from "@emotion/styled"
import { Settings } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../routes/path"
import HomeUI from "./components/HomeUI"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <SettingIcon className="material-icons" onClick={() => navigate(RouterPath.settings)} />
      <HomeUI />
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
`

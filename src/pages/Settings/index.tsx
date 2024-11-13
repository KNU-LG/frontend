import styled from "@emotion/styled"
import { AddPhotoAlternate, Delete, Image, LightMode, Person, Widgets } from "@mui/icons-material"
import HomeUI from "../Home/components/HomeUI"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../routes/path"
import { useColorMode } from "../../provider/ColorModeContext"

const Settings = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Wrapper>
      <TopWrapper>
        <IconWrapper>
          <Delete fontSize="inherit" />
          <Font>위젯 편집</Font>
        </IconWrapper>

        <IconWrapper onClick={() => navigate(`${RouterPath.imageSlides}`)}>
          <Image fontSize="inherit" />
          <Font>이미지 슬라이드쇼</Font>
        </IconWrapper>

        <IconWrapper onClick={toggleColorMode}>
          {colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}

          <LightMode fontSize="inherit" />
          <Font>라이트 모드</Font>
        </IconWrapper>
      </TopWrapper>
      <HomeUIWrapper>
        <HomeUI />
      </HomeUIWrapper>
      <TopWrapper>
        <IconWrapper>
          <AddPhotoAlternate fontSize="inherit" />
          <Font>이미지</Font>
        </IconWrapper>
        <IconWrapper>
          <Widgets fontSize="inherit" />
          <Font>위젯</Font>
        </IconWrapper>
        <IconWrapper>
          <Person fontSize="inherit" />
          <Font>프로필</Font>
        </IconWrapper>
      </TopWrapper>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HomeUIWrapper = styled.div`
  border-radius: 70px;
  background-color: rgba(217, 217, 217, 0.2);
  width: 100%;
  height: 70%;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 50px;
  color: white;
  background-color: #000;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  margin: 10px;
  padding: 10px;
  line-height: 1;
  cursor: pointer;
`

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: rgba(255, 255, 255, 0.65);
`

const Font = styled.p`
  font-size: 20px;
  font-weight: 600;
`

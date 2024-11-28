import styled from "@emotion/styled"
import {
  AddPhotoAlternate,
  ArrowBack,
  Delete,
  Image,
  LightMode,
  Person,
  Widgets,
} from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBackgroundImage } from "../../provider/BackgroundContext"
import { useColorMode } from "../../provider/ColorModeContext"
import { RouterPath } from "../../routes/path"
import HomeUI from "../Home/components/HomeUI"

const Settings = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLogin, setIsLogin] = useState(false)

  const handleBack = () => {
    navigate(RouterPath.home)
  }

  useEffect(() => {
    const accesstoken = localStorage.getItem("accessToken")
    if (accesstoken) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [isLogin])

  const { updateBackgroundImage } = useBackgroundImage()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      updateBackgroundImage(result)
      localStorage.setItem("backgroundImage", result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Wrapper>
      <BackIconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </BackIconWrapper>
      <IconsWrapper>
        <IconWrapper>
          <Delete fontSize="inherit" onClick={() => navigate(RouterPath.widgetsSetting)} />
          <Font>위젯 편집</Font>
        </IconWrapper>

        <IconWrapper onClick={() => navigate(RouterPath.imageSlides)}>
          <Image fontSize="inherit" />
          <Font>이미지 슬라이드쇼</Font>
        </IconWrapper>

        <IconWrapper onClick={toggleColorMode}>
          <LightMode fontSize="inherit" />
          <Font>{colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</Font>
        </IconWrapper>
      </IconsWrapper>
      <HomeUIWrapper>
        <HomeUI />
      </HomeUIWrapper>
      <IconsWrapper>
        <IconWrapper onClick={handleImageClick}>
          <AddPhotoAlternate fontSize="inherit" />
          <Font>이미지</Font>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </IconWrapper>

        <IconWrapper onClick={() => navigate(RouterPath.widgets)}>
          <Widgets fontSize="inherit" />
          <Font>위젯</Font>
        </IconWrapper>
        <IconWrapper
          onClick={() => (isLogin ? navigate(RouterPath.myPage) : navigate(RouterPath.login))}
        >
          <Person fontSize="inherit" />
          <Font>프로필</Font>
        </IconWrapper>
      </IconsWrapper>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  height: 100vh;
  width: 90vw;
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

const IconsWrapper = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 50px;
  color: white;
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
const BackIconWrapper = styled.div`
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
const HiddenInput = styled.input`
  display: none;
`

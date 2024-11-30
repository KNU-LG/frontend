import styled from "@emotion/styled"
import { AddPhotoAlternate, ArrowBack, Delete, Person, Widgets } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColorModeToggleButton, ScreenToggleButton } from "../../components/Button/ToggleButton"
import { useBackgroundImage } from "../../provider/BackgroundContext"
import { useColorMode } from "../../provider/ColorModeContext"
import { RouterPath } from "../../routes/path"
import HomeUI from "../Home/components/HomeUI"
import { SettingButton } from "./components/Button"

const Settings = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLogin, setIsLogin] = useState(false)
  const [activeScreen, setActiveScreen] = useState<"widget" | "image">("widget")
  const handleActiveScreen = () => {
    setActiveScreen(activeScreen === "widget" ? "image" : "widget")
  }

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
        <ScreenToggleButton activeScreen={activeScreen} setActiveScreen={handleActiveScreen} />
        <ColorModeToggleButton colorMode={colorMode} setColorMode={toggleColorMode} />
      </IconsWrapper>
      <HomeUIWrapper>
        <HomeUI />
      </HomeUIWrapper>
      <IconsWrapper>
        <IconWrapper onClick={() => navigate(RouterPath.widgetsSetting)}>
          <SettingButton>
            <SettingButtonWrapper>
              <Delete
                style={{
                  fontSize: "30px",
                  width: "30px",
                  height: "30px",
                  fill: "var(--color-black)",
                }}
              />
              <Text>Edit</Text>
            </SettingButtonWrapper>
          </SettingButton>
        </IconWrapper>

        <IconWrapper onClick={handleImageClick}>
          <SettingButton>
            <SettingButtonWrapper>
              <AddPhotoAlternate
                style={{
                  fontSize: "30px",
                  width: "30px",
                  height: "30px",
                  fill: "var(--color-black)",
                }}
              />
              <Text>Background</Text>
            </SettingButtonWrapper>
          </SettingButton>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </IconWrapper>

        <IconWrapper onClick={() => navigate(RouterPath.widgets)}>
          <SettingButton>
            <SettingButtonWrapper>
              <Widgets
                style={{
                  fontSize: "30px",
                  width: "30px",
                  height: "30px",
                  fill: "var(--color-black)",
                }}
              />
              <Text>Widget</Text>
            </SettingButtonWrapper>
          </SettingButton>
        </IconWrapper>
        <IconWrapper
          onClick={() => (isLogin ? navigate(RouterPath.myPage) : navigate(RouterPath.login))}
        >
          <SettingButton>
            <SettingButtonWrapper>
              <Person
                style={{
                  fontSize: "30px",
                  width: "30px",
                  height: "30px",
                  fill: "var(--color-black)",
                }}
              />
              <Text>Profile</Text>
            </SettingButtonWrapper>
          </SettingButton>
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
  gap: 10px;
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
const SettingButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-dark-gray);
`

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: rgba(255, 255, 255, 0.65);
  max-width: 200px;
  width: 100%;
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
const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
`

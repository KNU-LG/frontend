import styled from "@emotion/styled"
import { AddPhotoAlternate, Delete, Person, Widgets } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "../../components/Button/BackButton"
import { ColorModeToggleButton, ScreenToggleButton } from "../../components/Button/ToggleButton"
import { useBackgroundImage } from "../../provider/BackgroundContext"
import { useColorMode } from "../../provider/ColorModeContext"
import { RouterPath } from "../../routes/path"
import BackgroundUI from "./components/BackgroundUI"
import { SettingButton } from "./components/Button"

const Settings = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLogin, setIsLogin] = useState(false)
  const [activeScreen, setActiveScreen] = useState<"widget" | "image">("widget")
  const handleActiveScreen = () => {
    setActiveScreen(activeScreen === "widget" ? "image" : "widget")
  }

  useEffect(() => {
    const accesstoken = localStorage.getItem("accessToken")
    if (accesstoken) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [isLogin])

  const { backgroundImage, updateBackgroundImage } = useBackgroundImage()

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

  const handleBack = () => {
    navigate(RouterPath.home)
  }

  return (
    <Wrapper>
      <BackButton handleBack={handleBack} />
      <IconsWrapperTop>
        <LabelWrapper>
          <Label>Screen</Label>
          <ScreenToggleButton activeScreen={activeScreen} setActiveScreen={handleActiveScreen} />
        </LabelWrapper>
        <LabelWrapper>
          <Label>Mode</Label>
          <ColorModeToggleButton colorMode={colorMode} setColorMode={toggleColorMode} />
        </LabelWrapper>
      </IconsWrapperTop>
      <BackgroundUI backgroundImage={backgroundImage} />
      <IconsWrapperBottom>
        <IconWrapper onClick={() => navigate(RouterPath.widgetsSetting)}>
          <SettingButton>
            <SettingButtonWrapper>
              <Delete
                style={{
                  fontSize: "30px",
                  width: "20px",
                  height: "20px",
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
                  width: "22px",
                  height: "22px",
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
                  width: "20px",
                  height: "20px",
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
                  width: "20px",
                  height: "20px",
                  fill: "var(--color-black)",
                }}
              />
              <Text>Profile</Text>
            </SettingButtonWrapper>
          </SettingButton>
        </IconWrapper>
      </IconsWrapperBottom>
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

const IconsWrapperTop = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: auto;
  font-size: 50px;
  margin: 0px 10px 50px 10px;
  line-height: 1;
  cursor: pointer;
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: auto;
`

const Label = styled.span`
  font-size: 18px;
  font-weight: 550;
  color: var(--color-dark-gray);
  align-items: center;
  height: 100%;
`

const IconsWrapperBottom = styled.div`
  display: flex;
  gap: 2px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 50px;
  margin: 50px 10px 0px 10px;
  padding: 0px 20px;
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
  max-width: 200px;
  width: 100%;
`
const HiddenInput = styled.input`
  display: none;
`
const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 16px;
`

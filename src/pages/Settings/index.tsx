import styled from "@emotion/styled"
import { Delete, Image, ImageAspectRatio, Light } from "@mui/icons-material"
import HomeUI from "../Home/components/HomeUI"

const Settings = () => {
  return (
    <Wrapper>
      <TopWrapper>
        <Delete fontSize="inherit" />
        <Light fontSize="inherit" />
        <Image fontSize="inherit" />
        <ImageAspectRatio fontSize="inherit" />
      </TopWrapper>
      <HomeUIWrapper>
        <HomeUI />
      </HomeUIWrapper>
      <TopWrapper>
        <Delete fontSize="inherit" />
        <Light fontSize="inherit" />
        <Image fontSize="inherit" />
        <ImageAspectRatio fontSize="inherit" />
      </TopWrapper>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  height: 100vh; // 전체 화면에서 가운데 배치
  width: 100vw;
  display: flex; /* 추가 */
  flex-direction: column;
  align-items: center; /* 추가 */
  justify-content: center; /* 추가 */
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

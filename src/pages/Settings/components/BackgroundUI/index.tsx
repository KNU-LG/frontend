import styled from "@emotion/styled"
import defaultBackground from "../../../../assets/defaultBackground.svg"

const BackgroundUI = styled.div<{ backgroundImage: string }>`
  border-radius: 70px;
  height: 60%;
  aspect-ratio: 1.7/1;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export default BackgroundUI

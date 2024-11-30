import styled from "@emotion/styled"

const BackgroundUI = styled.div<{ backgroundImage: string }>`
  border-radius: 70px;
  width: 100%;
  height: 70%;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export default BackgroundUI

import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"

type BackButtonProps = {
  handleBack: () => void
}

const BackButton = ({ handleBack }: BackButtonProps) => {
  return (
    <BackIconWrapper onClick={handleBack}>
      <ArrowBack fontSize="inherit" />
    </BackIconWrapper>
  )
}

export default BackButton

const BackIconWrapper = styled.div`
  position: absolute;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  font-size: 35px;
  width: 35px;
  height: 35px;
  top: 25px;
  left: 25px;
`

import styled from "@emotion/styled"
import { useEditMode } from "../../../provider/EditModeContext"
import { usePosition } from "../../../provider/PositionContext"

export const WidgetEditor = () => {
  const { savePositions } = usePosition()
  const { isEditMode, setIsEditMode } = useEditMode()

  const handleSave = async () => {
    await savePositions()
    setIsEditMode(false)
    window.location.reload()
  }

  const handleCancel = () => {
    setIsEditMode(false)
    window.location.reload()
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  return (
    <Wrapper>
      <ButtonContainer>
        {isEditMode ? (
          <>
            <Button onClick={handleCancel} cancel>
              편집 취소
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </>
        ) : (
          <Button onClick={handleEdit} fullWidth>
            위젯 편집
          </Button>
        )}
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 90%;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

const Button = styled.button<{ cancel?: boolean; fullWidth?: boolean }>`
  flex: ${(props) => (props.fullWidth ? "1" : "0.5")};
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => (props.cancel ? "#e0e0e0" : "gray")};
  border: none;
  color: ${(props) => (props.cancel ? "#333" : "white")};
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

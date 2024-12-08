import styled from "@emotion/styled"
import { useEditMode } from "../../../provider/EditModeContext"
import { usePosition } from "../../../provider/PositionContext"
import { SettingButton } from "../../Settings/components/Button"

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
            <CustomSettingButton onClick={handleCancel} cancel>
              Cancel
            </CustomSettingButton>
            <CustomSettingButton onClick={handleSave}>Save</CustomSettingButton>
          </>
        ) : (
          <CustomSettingButton onClick={handleEdit} fullWidth>
            Edit Widget
          </CustomSettingButton>
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
  width: 50%;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

const CustomSettingButton = styled(SettingButton)<{ cancel?: boolean; fullWidth?: boolean }>`
  flex: ${(props) => (props.fullWidth ? "1" : "0.5")};
  background-color: ${(props) => (props.cancel ? "white" : "var(--color-red)")};
  color: ${(props) => (props.cancel ? "#333" : "white")};
  &:hover {
    opacity: ${(props) => (props.cancel ? "1" : "0.8")};
    background-color: ${(props) => (props.cancel ? "#e2e2e2" : "var(--color-red)")};
  }
`

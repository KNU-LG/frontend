import styled from "@emotion/styled"
import { useEditMode } from "../../../provider/EditModeContext"
import { usePosition } from "../../../provider/PositionContext"

export const WidgetEditor = () => {
  const { savePositions } = usePosition()
  const { isEditMode, setIsEditMode } = useEditMode()

  const handleSave = () => {
    savePositions()
    setIsEditMode(false)
  }

  return (
    <EditorContainer>
      <Button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "편집 취소" : "위젯 편집"}
      </Button>
      {isEditMode && <Button onClick={handleSave}>저장</Button>}
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: gray;
  border: 1px solid gray;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

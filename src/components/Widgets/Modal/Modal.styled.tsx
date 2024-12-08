import styled from "@emotion/styled"
import { IconButton as MuiIconButton } from "@mui/material"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  gap: 8px;
  width: 100%;
  height: auto;
  align-items: flex-end;
`

export const ModalContent = styled.div`
  background: linear-gradient(145deg, var(--color-white), #f0f0f0);
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  color: black;
`

export const ModalTitle = styled.h2`
  font-size: 15px;
  width: 100%;
  height: auto;
  color: black;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  width: 20px;
  height: 20px;
  color: black;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 90%;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: auto;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 200px;
  height: auto;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`
export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  width: 100%;
  height: 20px;
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

export const StyledIconButton = styled(MuiIconButton)`
  padding: 4px;
  width: 15px;
  height: 15px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  color: black;
`

export const StatusMessage = styled.div<{ error?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.error ? "red" : "#007aff")};
  text-align: center;
  width: 100%;
  height: 20px;
`

export const ArrowWrapper = styled.span`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  height: 20px;
  color: black;
`

export const ScheduleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`

export const ScheduleListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`

export const ScheduleItem = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
  }
`

export const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`

export const ScheduleTitle = styled.h4`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
`

export const ScheduleDate = styled.span`
  font-size: 13px;
  color: #666;
`

export const ScheduleContent = styled.p`
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.5;
  white-space: pre-wrap;
`

export const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 24px 0;
  font-size: 14px;
`

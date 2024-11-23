import styled from "@emotion/styled"
import { Cancel } from "@mui/icons-material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { IconButton as MuiIconButton } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDeleteSchedule } from "../../../api/schedule/useDeleteSchedule"
import { usePostSchedule } from "../../../api/schedule/usePostSchedule"
import { Schedule, ScheduleResponse } from "../../../types"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  widgetKey: number
  scheduleList: ScheduleResponse[]
}

export const Modal = ({ isOpen, onClose, title, widgetKey, scheduleList }: ModalProps) => {
  const { mutate: postSchedule, status: postStatus } = usePostSchedule()
  const [isExpanded, setIsExpanded] = useState(false)
  const now = new Date().toISOString()
  const { mutate: deleteSchedule, status: deleteStatus } = useDeleteSchedule(widgetKey)

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule>({
    defaultValues: {
      calendarId: widgetKey,
      date: now,
      title: "",
      content: "",
    },
    mode: "onSubmit",
  })

  const onSubmit = handleSubmit((data) => {
    postSchedule(data, {
      onSuccess: () => {
        onClose()
      },
    })
  })
  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        <ArrowWrapper onClick={() => setIsExpanded(!isExpanded)}>
          <ArrowDropDownIcon />
          {isExpanded ? "접기" : "스케쥴 추가"}
        </ArrowWrapper>
        {isExpanded && (
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <Label>제목</Label>
              <Input
                {...register("title", {
                  required: "제목을 입력해주세요",
                })}
                placeholder="제목을 입력하세요"
              />
              {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
              <Label>내용</Label>
              <TextArea
                {...register("content", {
                  required: "내용을 입력해주세요",
                })}
                placeholder="내용을 입력하세요"
              />
              {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </InputWrapper>
            {postStatus === "pending" && <StatusMessage>저장 중입니다...</StatusMessage>}
            {postStatus === "error" && (
              <StatusMessage error>저장에 실패했습니다. 다시 시도해주세요.</StatusMessage>
            )}
            <SubmitButton type="submit" disabled={postStatus === "pending"}>
              저장
            </SubmitButton>
          </Form>
        )}
        <ScheduleListContainer>
          <ScheduleListTitle>스케줄 목록</ScheduleListTitle>
          {scheduleList.length === 0 ? (
            <EmptyMessage>등록된 스케줄이 없습니다.</EmptyMessage>
          ) : (
            scheduleList.map((schedule) => (
              <Wrapper key={schedule.id}>
                <StyledIconButton
                  onClick={() => {
                    deleteSchedule(schedule.id)
                  }}
                  disabled={deleteStatus === "pending"}
                >
                  <Cancel />
                </StyledIconButton>
                <ScheduleItem>
                  <ScheduleHeader>
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                    <ScheduleDate>{formatDate(schedule.date)}</ScheduleDate>
                  </ScheduleHeader>
                  <ScheduleContent>{schedule.content}</ScheduleContent>
                </ScheduleItem>
              </Wrapper>
            ))
          )}
        </ScheduleListContainer>
      </ModalContent>
    </Overlay>
  )
}

const Overlay = styled.div`
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  gap: 8px;
  width: 100%;
  height: auto;
  align-items: flex-end;
`

const ModalContent = styled.div`
  background-color: gray;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`

const ModalTitle = styled.h2`
  font-size: 15px;
  width: 100%;
  height: auto;
`

const CloseButton = styled.button`
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
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 90%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: auto;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`

const Input = styled.input`
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

const TextArea = styled.textarea`
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
const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  width: 100%;
  height: 20px;
`

const SubmitButton = styled.button`
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

const StyledIconButton = styled(MuiIconButton)`
  padding: 4px;
  width: 15px;
  height: 15px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

const StatusMessage = styled.div<{ error?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.error ? "red" : "#007aff")};
  text-align: center;
  width: 100%;
  height: 20px;
`

const ArrowWrapper = styled.span`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  height: 20px;
`

const ScheduleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`

const ScheduleListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`

const ScheduleItem = styled.div`
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

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`

const ScheduleTitle = styled.h4`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
`

const ScheduleDate = styled.span`
  font-size: 13px;
  color: #666;
`

const ScheduleContent = styled.p`
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.5;
  white-space: pre-wrap;
`

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 24px 0;
  font-size: 14px;
`

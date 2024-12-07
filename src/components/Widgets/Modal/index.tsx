import { Cancel } from "@mui/icons-material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDeleteSchedule } from "../../../api/schedule/useDeleteSchedule"
import { usePostSchedule } from "../../../api/schedule/usePostSchedule"
import { Schedule, ScheduleResponse } from "../../../types"
import * as S from "../Modal/Modal.styled"

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
    <S.Overlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        {title && <S.ModalTitle>{title}</S.ModalTitle>}
        <S.ArrowWrapper onClick={() => setIsExpanded(!isExpanded)}>
          <ArrowDropDownIcon />
          {isExpanded ? "접기" : "스케쥴 추가"}
        </S.ArrowWrapper>
        {isExpanded && (
          <S.Form onSubmit={onSubmit}>
            <S.InputWrapper>
              <S.Label>제목</S.Label>
              <S.Input
                {...register("title", {
                  required: "제목을 입력해주세요",
                })}
                placeholder="제목을 입력하세요"
              />
              {errors.title && <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>}
            </S.InputWrapper>

            <S.InputWrapper>
              <S.Label>내용</S.Label>
              <S.TextArea
                {...register("content", {
                  required: "내용을 입력해주세요",
                })}
                placeholder="내용을 입력하세요"
              />
              {errors.content && <S.ErrorMessage>{errors.content.message}</S.ErrorMessage>}
            </S.InputWrapper>
            {postStatus === "pending" && <S.StatusMessage>저장 중입니다...</S.StatusMessage>}
            {postStatus === "error" && (
              <S.StatusMessage error>저장에 실패했습니다. 다시 시도해주세요.</S.StatusMessage>
            )}
            <S.SubmitButton type="submit" disabled={postStatus === "pending"}>
              저장
            </S.SubmitButton>
          </S.Form>
        )}
        <S.ScheduleListContainer>
          <S.ScheduleListTitle>스케줄 목록</S.ScheduleListTitle>
          {scheduleList.length === 0 ? (
            <S.EmptyMessage>등록된 스케줄이 없습니다.</S.EmptyMessage>
          ) : (
            scheduleList.map((schedule) => (
              <S.Wrapper key={schedule.id} style={{ color: "black" }}>
                <S.StyledIconButton
                  onClick={() => {
                    deleteSchedule(schedule.id)
                  }}
                  disabled={deleteStatus === "pending"}
                  style={{ color: "black" }}
                >
                  <Cancel />
                </S.StyledIconButton>
                <S.ScheduleItem>
                  <S.ScheduleHeader>
                    <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
                    <S.ScheduleDate>{formatDate(schedule.date)}</S.ScheduleDate>
                  </S.ScheduleHeader>
                  <S.ScheduleContent>{schedule.content}</S.ScheduleContent>
                </S.ScheduleItem>
              </S.Wrapper>
            ))
          )}
        </S.ScheduleListContainer>
      </S.ModalContent>
    </S.Overlay>
  )
}

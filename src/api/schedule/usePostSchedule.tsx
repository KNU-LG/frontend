import { useMutation } from "@tanstack/react-query"

import { APIResponse, Schedule, ScheduleResponse } from "../../types"

import { isAxiosError } from "axios"

import { useQueryClient } from "@tanstack/react-query"
import { fetchInstanceWithToken } from "../instance"

const postSchedule = async (scheduleInfo: Schedule): Promise<APIResponse<ScheduleResponse>> => {
  const response = await fetchInstanceWithToken().post("/schedule", scheduleInfo)
  return response.data
}

export const usePostSchedule = () => {
  const queryClient = useQueryClient()

  const { mutate, status } = useMutation<
    APIResponse<ScheduleResponse>,
    APIResponse<null>,
    Schedule
  >({
    mutationFn: (scheduleInfo: Schedule) => postSchedule(scheduleInfo),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`스케줄 추가에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("스케줄 추가 중 오류가 발생했습니다.")
      }
    },
    onSuccess: (_, variables) => {
      // variables.calendarId를 사용하여 해당 캘린더의 스케줄 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: ["schedule", variables.calendarId],
      })
    },
  })

  return { mutate, status }
}

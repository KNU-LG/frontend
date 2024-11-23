import { useMutation } from "@tanstack/react-query"

import { APIResponse, Calendar, CalendarResponse } from "../../types"

import { isAxiosError } from "axios"

import { fetchInstanceWithToken } from "../instance"

const postCalendar = async (calendarInfo: Calendar): Promise<APIResponse<CalendarResponse>> => {
  const response = await fetchInstanceWithToken().post("/widget/calendar", calendarInfo)
  return response.data
}

export const usePostCalendar = () => {
  const { mutate, status } = useMutation<
    APIResponse<CalendarResponse>,
    APIResponse<null>,
    Calendar
  >({
    mutationFn: (calendarInfo: Calendar) => postCalendar(calendarInfo),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`캘린더 추가에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("캘린더 추가 중 오류가 발생했습니다.")
      }
    },
    onSuccess: () => {
      alert("캘린더가 성공적으로 추가되었습니다.")
    },
  })

  return { mutate, status }
}

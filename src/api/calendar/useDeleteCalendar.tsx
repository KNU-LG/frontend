import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { APIResponse } from "../../types"
import { fetchInstanceWithToken } from "../instance"
import removeFromLocalStorage from "./hooks/removeLocalStorage"

export const useDeleteCalendar = (calendarId: number) => {
  const deleteCalendar = async (calendarId: number): Promise<APIResponse<null>> => {
    const response = await fetchInstanceWithToken().delete(`/widget/calendar/${calendarId}`)
    return response.data
  }

  const { mutate, status } = useMutation<APIResponse<null>, APIResponse<null>, number>({
    mutationFn: (id: number) => deleteCalendar(id),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`캘린더 삭제에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("캘린더 삭제 중 오류가 발생했습니다.")
      }
    },
    onSuccess: () => {
      try {
        removeFromLocalStorage(calendarId)
      } catch (error) {
        console.error("로컬 스토리지 데이터 삭제 중 오류 발생:", error)
      }
    },
  })

  return { mutate, status }
}

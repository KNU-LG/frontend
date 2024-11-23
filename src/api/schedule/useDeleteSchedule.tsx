import { useMutation } from "@tanstack/react-query"

import { APIResponse } from "../../types"

import { isAxiosError } from "axios"

import { useQueryClient } from "@tanstack/react-query"
import { fetchInstanceWithToken } from "../instance"

const deleteSchedule = async (scheduleId: number): Promise<APIResponse<null>> => {
  const response = await fetchInstanceWithToken().delete(`/schedule/${scheduleId}`)
  return response.data
}

export const useDeleteSchedule = (calendarId: number) => {
  const queryClient = useQueryClient()

  const { mutate, status } = useMutation<APIResponse<null>, APIResponse<null>, number>({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`스케줄 삭제에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("스케줄 삭제 중 오류가 발생했습니다.")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedule", calendarId],
      })
    },
  })

  return { mutate, status }
}

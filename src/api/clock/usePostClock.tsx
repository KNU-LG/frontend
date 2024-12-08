import { useMutation } from "@tanstack/react-query"

import { APIResponse, ClockResponse, ClockSend } from "../../types"

import { isAxiosError } from "axios"

import { fetchInstanceWithToken } from "../instance"

const postClock = async (clockInfo: ClockSend): Promise<APIResponse<ClockResponse>> => {
  const response = await fetchInstanceWithToken().post("/widget/clock/add", clockInfo)
  console.log("전송 데이터:", clockInfo)

  return response.data
}

export const usePostClock = () => {
  const { mutate, status } = useMutation<APIResponse<ClockResponse>, APIResponse<null>, ClockSend>({
    mutationFn: (clockInfo: ClockSend) => postClock(clockInfo),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`시계 추가에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("시계 추가 중 오류가 발생했습니다.")
      }
    },
    onSuccess: () => {
      alert("시계가 성공적으로 추가되었습니다.")
    },
  })

  return { mutate, status }
}

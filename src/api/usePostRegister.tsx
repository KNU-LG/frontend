import { useMutation } from "@tanstack/react-query"

import { fetchInstance } from "./instance"

import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../routes/path"
import { APIErrorResponse, Register, UserResponse } from "../types"

export const postRegister = async (userInfo: Register): Promise<UserResponse> => {
  const response = await fetchInstance().post("/user/register", userInfo)
  return response.data
}

export const usePostRegister = () => {
  const navigate = useNavigate()
  const { mutate, status } = useMutation<UserResponse, APIErrorResponse, Register>({
    mutationFn: (userInfo: Register) => postRegister(userInfo),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`회원가입에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("회원가입 중 오류가 발생했습니다.")
      }
    },
    onSuccess: (response) => {
      alert("회원가입이 완료 되었습니다.")
      const accesstoken = response.data.token
      if (accesstoken) {
        localStorage.setItem("accessToken", accesstoken)
      }

      navigate(`${RouterPath.home}`)
    },
  })

  return { mutate, status }
}

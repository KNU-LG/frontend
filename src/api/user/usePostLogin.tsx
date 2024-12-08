import { useMutation } from "@tanstack/react-query"

import { fetchInstance } from "../instance"

import { APIResponse, Login, UserResponse } from "../../types"

import { isAxiosError } from "axios"

import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../routes/path"

const postLogin = async (userLogin: Login): Promise<APIResponse<UserResponse>> => {
  const response = await fetchInstance().post("/user/login", userLogin)
  return response.data
}

export const usePostLogin = () => {
  const navigate = useNavigate()
  const { mutate, status } = useMutation<APIResponse<UserResponse>, APIResponse<null>, Login>({
    mutationFn: (userLogin: Login) => postLogin(userLogin),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`로그인에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("로그인 중 오류가 발생했습니다.")
      }
    },
    onSuccess: (response) => {
      alert("로그인이 완료 되었습니다.")
      const accesstoken = response.data.token
      if (accesstoken) {
        localStorage.setItem("accessToken", accesstoken)
      }
      navigate(`${RouterPath.home}`)
    },
  })

  return { mutate, status }
}

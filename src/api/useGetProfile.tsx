import { useSuspenseQuery } from "@tanstack/react-query"
import { APIResponse, ProfileResponse } from "../types"
import { fetchInstanceWithToken } from "./instance"
import { jwtDecode } from "jwt-decode"

const getProfile = async (userId: string): Promise<APIResponse<ProfileResponse>> => {
  const response = await fetchInstanceWithToken().get("/user/:user-id", {
    params: {
      userId: userId,
    },
  })
  const token = userId
  const decoded = jwtDecode(token)
  return response.data
}

export const useGetProfile = (userId: string) => {
  const { data } = useSuspenseQuery<APIResponse<ProfileResponse>, APIResponse<null>>({
    queryFn: () => getProfile(userId),
    queryKey: ["profile", userId],
    staleTime: 0,
  })

  return { data }
}

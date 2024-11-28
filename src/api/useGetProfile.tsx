import { useSuspenseQuery } from "@tanstack/react-query"
import { APIResponse, ProfileResponse } from "../types"
import { fetchInstanceWithToken } from "./instance"
import { jwtDecode } from "jwt-decode"

const extractUserId = (token: string): string | null => {
  const decoded = jwtDecode<{ userId: string }>(token)
  return decoded.userId || null
}

const getProfile = async (token: string): Promise<APIResponse<ProfileResponse>> => {
  const userId = extractUserId(token)
  const response = await fetchInstanceWithToken().get("/user/:user-id", {
    params: {
      userId: userId,
    },
  })
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

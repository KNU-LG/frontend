import { useSuspenseQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { APIResponse, ProfileResponse } from "../../types"
import { fetchInstanceWithToken } from "../instance"

const extractUserId = (token: string): string | null => {
  const decoded = jwtDecode<{ id: string }>(token)
  console.log(token)
  console.log(decoded)
  return decoded.id || null
}

const getProfile = async (token: string): Promise<APIResponse<ProfileResponse>> => {
  const userId = extractUserId(token)
  const response = await fetchInstanceWithToken().get(`/user/${userId}`)
  return response.data
}

export const useGetProfile = (token: string) => {
  const { data } = useSuspenseQuery<APIResponse<ProfileResponse>, APIResponse<null>>({
    queryFn: () => getProfile(token),
    queryKey: ["profile", token],
    staleTime: 0,
  })

  return { data }
}

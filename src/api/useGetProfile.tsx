import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchInstanceWithToken } from "./instance"
import { isAxiosError } from "axios"
import { APIResponse, ProfileResponse } from "../types"
import { jwtDecode } from "jwt-decode"

const getProfile = async (userId: string): Promise<APIResponse<ProfileResponse[]>>  => {
    const response = await fetchInstanceWithToken().get("/user/:user-id", {
        params: {
            userId: userId,
        },
    })
    return response.data
}

const token = 
const decoded = jwtDecode(token)

export const useGetProfile = (userId: string) => {
    const { data } = useSuspenseQuery<APIResponse<ProfileResponse[]>, APIResponse<null>>({
        queryFn: () => getProfile(userId),
        queryKey: ["schedule", userId],
        staleTime: 0,
    })

    return { data, status }
  }


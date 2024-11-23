import { useSuspenseQuery } from "@tanstack/react-query"

import { APIResponse, ScheduleResponse } from "../../types"

import { fetchInstanceWithToken } from "../instance"

const getSchedule = async (calendarId: number): Promise<APIResponse<ScheduleResponse[]>> => {
  const response = await fetchInstanceWithToken().get("/schedule", {
    params: {
      calendarId: calendarId,
    },
  })
  return response.data
}

export const useGetSchedule = (calendarId: number) => {
  const { data } = useSuspenseQuery<APIResponse<ScheduleResponse[]>, APIResponse<null>>({
    queryFn: () => getSchedule(calendarId),
    queryKey: ["schedule", calendarId],
    staleTime: 0,
  })

  return { data }
}

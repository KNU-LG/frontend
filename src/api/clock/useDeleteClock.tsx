import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { APIResponse } from "../../types"
import { fetchInstanceWithToken } from "../instance"

interface Widget {
  type: string
  size: string
  key: number
}

interface WidgetPosition {
  position: {
    x: number
    y: number
  }
  widgetName: string
}

const deleteClock = async (clockId: number): Promise<APIResponse<null>> => {
  const response = await fetchInstanceWithToken().delete(`/widget/clock/${clockId}`)
  return response.data
}

const removeFromLocalStorage = (clockId: number) => {
  // 위젯 포지션 업데이트
  const savedPositions = localStorage.getItem("widgetPositions")
  if (savedPositions) {
    const positions: Record<string, WidgetPosition> = JSON.parse(savedPositions)
    const updatedPositions = Object.entries(positions).reduce(
      (acc, [key, value]) => {
        // Clock-{clockId} 형식의 키를 가진 항목 제외
        if (!key.includes(`-${clockId}-Clock`)) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, WidgetPosition>,
    )
    localStorage.setItem("widgetPositions", JSON.stringify(updatedPositions))
  }

  // 위젯 목록 업데이트
  const savedWidgets = localStorage.getItem("widgets")
  if (savedWidgets) {
    const widgets: Widget[] = JSON.parse(savedWidgets)
    const updatedWidgets = widgets.filter((widget) => widget.key !== clockId)
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))
  }
}

export const useDeleteClock = (clockId: number) => {
  const { mutate, status } = useMutation<APIResponse<null>, APIResponse<null>, number>({
    mutationFn: (id: number) => deleteClock(id),
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        alert(`시계 삭제에 실패하였습니다. 이유 : ${errorMessage}`)
      } else {
        alert("시계 삭제 중 오류가 발생했습니다.")
      }
    },
    onSuccess: () => {
      try {
        removeFromLocalStorage(clockId)
      } catch (error) {
        console.error("로컬 스토리지 데이터 삭제 중 오류 발생:", error)
      }
    },
  })

  return { mutate, status }
}

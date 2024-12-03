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

const removeFromLocalStorage = (calendarId: number) => {
  // 위젯 포지션 업데이트
  const savedPositions = localStorage.getItem("widgetPositions")
  if (savedPositions) {
    const positions: Record<string, WidgetPosition> = JSON.parse(savedPositions)
    const updatedPositions = Object.entries(positions).reduce(
      (acc, [key, value]) => {
        // Calendar-{calendarId} 형식의 키를 가진 항목 제외
        if (!key.includes(`-${calendarId}-Calendar`)) {
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
    const updatedWidgets = widgets.filter((widget) => widget.key !== calendarId)
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets))
  }
}

export default removeFromLocalStorage

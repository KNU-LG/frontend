import styled from "@emotion/styled"
import React, { useEffect } from "react"
import { animated, useSpring } from "react-spring"
import { useDrag } from "react-use-gesture"
import { useEditMode } from "../../provider/EditModeContext"
import { usePosition } from "../../provider/PositionContext"

interface DragConProps {
  name: string
  widgetHeight: number
  widgetWidth: number
  children: React.ReactNode
}

interface WrapperProps {
  width: number
  height: number
}

export const DragCon = (dragprops: DragConProps) => {
  const { positions, updatePosition, isLoading } = usePosition()
  const { isEditMode } = useEditMode()

  const [props, set] = useSpring(() => ({
    x: positions[dragprops.name]?.x || 0,
    y: positions[dragprops.name]?.y || 0,
    immediate: true, // 초기 위치로 즉시 이동
  }))

  useEffect(() => {
    if (!isLoading && positions[dragprops.name]) {
      set({
        x: positions[dragprops.name].x,
        y: positions[dragprops.name].y,
        immediate: true, // 애니메이션 없이 즉시 이동
      })
    }
  }, [positions, dragprops.name, isLoading])

  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.8

  const bindPos = useDrag(
    (state) => {
      if (!isEditMode) return
      const { offset } = state
      const newX = Math.max(0, Math.min(offset[0], width - dragprops.widgetWidth))
      const newY = Math.max(0, Math.min(offset[1], height - dragprops.widgetHeight))

      set({ x: newX, y: newY })
      updatePosition(dragprops.name, { x: newX, y: newY })
    },
    {
      from: () => [
        positions[dragprops.name]?.x ?? props.x.get(), // `undefined`일 경우 현재 애니메이션 상태 사용
        positions[dragprops.name]?.y ?? props.y.get(),
      ],
      enabled: isEditMode, // 편집 모드일 때만 드래그 활성화
      bounds: {
        // 드래그 범위 제한
        left: 0,
        right: width - dragprops.widgetWidth,
        top: 0,
        bottom: height - dragprops.widgetHeight,
      },
    },
  )

  return (
    <Wrapper
      {...(isEditMode ? bindPos() : {})} // 편집 모드일 때만 드래그 이벤트 바인딩
      style={{
        ...props,
        cursor: isEditMode ? "grab" : "default", // 편집 모드일 때만 grab 커서
        border: isEditMode ? "2px dashed #666" : "none", // 편집 모드일 때 테두리 표시
      }}
      width={dragprops.widgetWidth} // styled 컴포넌트 내부에서 사용
      height={dragprops.widgetHeight} // styled 컴포넌트 내부에서 사용
    >
      {dragprops.children}
    </Wrapper>
  )
}

const Wrapper = styled(animated.div)<WrapperProps>`
  font-size: 12px;
  position: fixed;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: 10vw;
  top: 0;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`

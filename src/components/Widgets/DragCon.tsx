interface DragConProps {
  name: string
  widgetHeight: number
  widgetWidth: number
  children: React.ReactNode
  widgetKey: number
}

interface WrapperProps {
  width: number
  height: number
}

import styled from "@emotion/styled"
import React, { useEffect } from "react"
import { animated, useSpring } from "react-spring"
import { useDrag } from "react-use-gesture"
import { useEditMode } from "../../provider/EditModeContext"
import { usePosition } from "../../provider/PositionContext"

export const DragCon = (dragProps: DragConProps) => {
  const { positions, updatePosition, isLoading } = usePosition()
  const { isEditMode } = useEditMode()

  const widgetId = `widget-${dragProps.widgetKey}-${dragProps.name}`

  const [props, set] = useSpring(() => ({
    x: positions[widgetId]?.position?.x || 0,
    y: positions[widgetId]?.position?.y || 0,
    immediate: true,
  }))

  useEffect(() => {
    if (!isLoading && positions[widgetId]) {
      set({
        x: positions[widgetId].position.x,
        y: positions[widgetId].position.y,
        immediate: true,
      })
    }
  }, [positions, widgetId, isLoading])

  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.8

  const bindPos = useDrag(
    (state) => {
      if (!isEditMode) return
      const { offset } = state
      const newX = Math.max(0, Math.min(offset[0], width - dragProps.widgetWidth))
      const newY = Math.max(0, Math.min(offset[1], height - dragProps.widgetHeight))

      set({ x: newX, y: newY })
      updatePosition(widgetId, { x: newX, y: newY })
    },
    {
      from: () => [
        positions[widgetId]?.position?.x ?? props.x.get(),
        positions[widgetId]?.position?.y ?? props.y.get(),
      ],
      enabled: isEditMode,
      bounds: {
        left: 0,
        right: width - dragProps.widgetWidth,
        top: 0,
        bottom: height - dragProps.widgetHeight,
      },
    },
  )

  return (
    <Wrapper
      {...(isEditMode ? bindPos() : {})}
      style={{
        ...props,
        cursor: isEditMode ? "grab" : "default",
        border: isEditMode ? "2px dashed #666" : "none",
      }}
      width={dragProps.widgetWidth}
      height={dragProps.widgetHeight}
    >
      {dragProps.children}
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: transparent;
`

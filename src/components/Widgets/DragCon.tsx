import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { animated, useSpring } from "react-spring"
import { useDrag } from "react-use-gesture"
import { usePosition } from "../../provider/PositionContext"

interface DragConProps {
  name: string
  widgetHeight: number
  widgetWidth: number
  children: React.ReactNode
}

interface WrapperProps {
  widgetWidth: number
  widgetHeight: number
}

export const DragCon = (dragprops: DragConProps) => {
  const { positions, updatePosition, isLoading } = usePosition()

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  useEffect(() => {
    if (!isLoading) {
      const position = positions[dragprops.name] || { x: 0, y: 0 }
      set({ x: position.x, y: position.y })
    }
  }, [isLoading, positions, dragprops.name, set])

  const width = window.innerWidth
  const height = window.innerHeight

  const bindPos = useDrag(
    (state) => {
      const { offset } = state
      const newX = Math.max(0, Math.min(offset[0], width - dragprops.widgetWidth))
      const newY = Math.max(0, Math.min(offset[1], height - dragprops.widgetHeight))

      set({ x: newX, y: newY })
      updatePosition(dragprops.name, { x: newX, y: newY })
    },
    {
      from: () => [props.x.get(), props.y.get()],
    },
  )

  return (
    <Wrapper {...bindPos()} style={props} widgetWidth={dragprops.widgetWidth} widgetHeight={dragprops.widgetHeight}>
      {dragprops.children}
    </Wrapper>
  )
}

const Wrapper = styled(animated.div)<WrapperProps>`
  font-size: 12px;
  position: fixed;
  width: ${(props) => props.widgetWidth}px;
  height: ${(props) => props.widgetHeight}px;
  left: 10vw;
  top: 0;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`

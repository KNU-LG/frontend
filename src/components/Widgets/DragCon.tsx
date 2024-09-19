import styled from "@emotion/styled"
import { animated, useSpring } from "react-spring"
import { useDrag } from "react-use-gesture"

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
  const [props, set] = useSpring(() => {
    const savedPos = localStorage.getItem(dragprops.name)
    const initialPos = savedPos ? JSON.parse(savedPos) : { x: 0, y: 0 }
    return { x: initialPos.x, y: initialPos.y }
  })

  const width = window.innerWidth
  const height = window.innerHeight

  const bindPos = useDrag((state) => {
    const { offset } = state
    const newX = Math.max(0, Math.min(offset[0], width - dragprops.widgetWidth))
    const newY = Math.max(0, Math.min(offset[1], height - dragprops.widgetHeight))

    set({ x: newX, y: newY })

    localStorage.setItem(dragprops.name, JSON.stringify({ x: newX, y: newY }))
  })

  return (
    <Wrapper
      {...bindPos()}
      style={{
        x: props.x,
        y: props.y,
      }}
      widgetWidth={dragprops.widgetWidth}
      widgetHeight={dragprops.widgetHeight}
    >
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
`

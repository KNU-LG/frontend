import styled from "@emotion/styled"

type CalendarUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const CalendarUI = ({ size, ...props }: CalendarUIProp) => {
  const dimensions = {
    L: { width: 200, height: 200 },
    M: { width: 150, height: 150 },
    S: { width: 100, height: 100 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return (
    <Wrapper widgetHeight={widgetHeight} widgetWidth={widgetWidth} {...props}>
      <p>Calendar widget UI</p>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ widgetHeight: number; widgetWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: ${({ widgetHeight }) => widgetHeight}px;
  background-color: #f0f0f0;
  font-size: 20px;
  border: 1px solid gray;
  cursor: pointer;
`

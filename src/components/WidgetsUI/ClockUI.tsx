import styled from "@emotion/styled"

type CalendarUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const ClockUI = ({ size, ...props }: CalendarUIProp) => {
  const dimensions = {
    L: { width: 210, height: 140 },
    M: { width: 150, height: 100 },
    S: { width: 120, height: 80 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return (
    <Wrapper widgetHeight={widgetHeight} widgetWidth={widgetWidth} {...props}>
      <p>Clock widget UI</p>
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
  border-radius: 15px;
  padding: 5px;
  cursor: pointer;
`

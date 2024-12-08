import styled from "@emotion/styled"

type CalendarUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const CalendarUI = ({ size, ...props }: CalendarUIProp) => {
  const dimensions = {
    L: { width: 220, height: 140 },
    M: { width: 200, height: 120 },
    S: { width: 180, height: 100 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return (
    <Wrapper widgetHeight={widgetHeight} widgetWidth={widgetWidth} {...props}>
      <Date>12월 14일 오전 8:00</Date>
      <Title>일정</Title>
      <Description>일정을 입력해 주세요.</Description>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ widgetHeight: number; widgetWidth: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: ${({ widgetHeight }) => widgetHeight}px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const Date = styled.h6`
  font-size: 13px;
  color: #5a5a5a;
  margin: 0 0 5px 0;
`

const Title = styled.h5`
  font-size: 17px;
  color: #000000;
  margin: 0 0 5px 0;
`

const Description = styled.p`
  font-size: 12px;
  color: #5a5a5a;
  margin: 0;
`

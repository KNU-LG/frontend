import styled from "@emotion/styled"

type ClockUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const ClockUI = ({ size, ...props }: ClockUIProp) => {
  const dimensions = {
    L: { width: 220, height: 120 },
    M: { width: 180, height: 100 },
    S: { width: 160, height: 80 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return (
    <Wrapper widgetHeight={widgetHeight} widgetWidth={widgetWidth} {...props}>
      <TextContainer>
        <Title>오전 12:45</Title>
        <DataText>2024년 12월 14일</DataText>
      </TextContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ widgetHeight: number; widgetWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: ${({ widgetHeight }) => widgetHeight}px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 15px;
  padding: 30px 10px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  gap: 10px;
`

const DataText = styled.h6`
  font-size: 14px;
  color: #5a5a5a;
`

const Title = styled.h2`
  font-size: 18px;
  color: #000000;
  margin: 0;
`

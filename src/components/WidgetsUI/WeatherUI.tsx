import styled from "@emotion/styled"
import weather from "../../assets/weather.svg"

type WeatherUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const WeatherUI = ({ size, ...props }: WeatherUIProp) => {
  const dimensions = {
    L: { width: 240, height: 130 },
    M: { width: 180, height: 100 },
    S: { width: 140, height: 80 },
  }

  const widgetWidth = dimensions[size].width
  const widgetHeight = dimensions[size].height

  return <Wrapper widgetHeight={widgetHeight} widgetWidth={widgetWidth} {...props}></Wrapper>
}

const Wrapper = styled.div<{ widgetHeight: number; widgetWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ widgetWidth }) => widgetWidth}px;
  height: ${({ widgetHeight }) => widgetHeight}px;
  background-image: url(${weather});
  background-size: contain;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

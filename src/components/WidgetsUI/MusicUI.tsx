import styled from "@emotion/styled"
import music from "../../assets/music.svg"

type MusicUIProp = {
  size: "L" | "M" | "S"
} & React.HTMLAttributes<HTMLDivElement>

export const MusicUI = ({ size, ...props }: MusicUIProp) => {
  const dimensions = {
    L: { width: 210, height: 120 },
    M: { width: 170, height: 90 },
    S: { width: 130, height: 70 },
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
  background-image: url(${music});
  background-size: contain;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

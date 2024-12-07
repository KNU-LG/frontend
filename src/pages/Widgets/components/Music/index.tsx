import styled from "@emotion/styled"
import { MusicUI } from "../../../../components/WidgetsUI/MusicUI"
const Music = () => {
  return (
    <WidgetWrapper>
      <MusicUI size="L" />
      <MusicUI size="M" />
      <MusicUI size="S" />
    </WidgetWrapper>
  )
}

export default Music

const WidgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

import styled from "@emotion/styled"
import { WeatherUI } from "../../../../components/WidgetsUI/WeatherUI"

const Weather = () => {
  return (
    <WidgetWrapper>
      <WeatherUI size="L" />
      <WeatherUI size="M" />
      <WeatherUI size="S" />
    </WidgetWrapper>
  )
}

export default Weather

const WidgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

import { css } from "@emotion/react"
import styled from "@emotion/styled"

type Color = "red" | "white" | "black"
type Size = "small" | "big"

interface ButtonProps {
  color?: Color
  size?: Size
}

const colorStyles = {
  red: css`
    background-color: #a50034;
    color: white;
  `,
  white: css`
    background-color: #f2f2f2;
    color: black;
  `,
  black: css`
    background-color: #616161;
    color: white;
  `,
}

const sizeStyles = {
  small: css`
    width: 200px;
    height: 35px;
    font-size: 14px;
  `,
  big: css`
    width: 300px;
    height: 35px;
    font-size: 14px;
  `,
}

const CustomButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  ${(props) => colorStyles[props.color || "red"]};
  ${(props) => sizeStyles[props.size || "small"]};
  &:hover {
    opacity: 0.9;
  }
`

export default CustomButton

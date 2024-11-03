import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

type Color = "red" | "white" | "black"
type Size = "small" | "big"

interface ButtonProps {
  color?: Color
  size?: Size
}

const colorStyles = {
  red: css`
    background-color: rgba(255, 165, 0, 0.2);
    color: white;
  `,
  white: css`
    background-color: white;
    color: black;
  `,
  black: css`
    background-color: black;
    color: white;
  `,
}

const sizeStyles = {
  small: css`
    width: 150px;
    height: 40px;
    font-size: 14px;
  `,
  big: css`
    width: 380px;
    height: 80px;
    font-size: 16px;
  `,
}

const CustomButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 20px;
  cursor: pointer;
  ${(props) => colorStyles[props.color || "red"]};
  ${(props) => sizeStyles[props.size || "small"]};
  &:hover {
    opacity: 0.9;
  }
`

export default CustomButton

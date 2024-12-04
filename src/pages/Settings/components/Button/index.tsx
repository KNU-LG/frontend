import styled from "@emotion/styled"

export const SettingButton = styled.button`
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  max-width: 220px;
  height: 40px;
  font-size: 18px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  color: (--color-dark-gray);
  transition: all 0.3s;
  &:hover {
    background-color: #e2e2e2;
  }
`

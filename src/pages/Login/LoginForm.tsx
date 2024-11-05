import React, { useState } from "react"
import styled from "@emotion/styled"
import CustomButton from "../../components/Button"

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`

const StyledInput = styled.input`
  width: 80%;
  height: 40px;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
`

const LoginForm: React.FC = () => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("?????", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: id,
          password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("로그인 성공")
      } else {
        console.log("로그인 실패")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <FormContainer>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton color="black" size="big">
          로그인
        </CustomButton>
      </form>
    </FormContainer>
  )
}

export default LoginForm

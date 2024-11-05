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

const LoginForm = () => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    //
  }
}

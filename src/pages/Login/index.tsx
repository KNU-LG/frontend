import styled from "@emotion/styled"
import LoginForm from "./LoginForm"

const Login = () => {
  return (
    <Container>
      <CustomForm>
        <Title>Login</Title>
        <LoginForm></LoginForm>
      </CustomForm>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: #f2f2f2;
`

const CustomForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  width: 500px;
  height: 500px;
  padding: 60px 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #616161;
`

import styled from "@emotion/styled"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../routes/path"
import LoginForm from "./LoginForm"

const Login = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(RouterPath.settings)
  }
  return (
    <Container>
      <BackIconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </BackIconWrapper>
      <CustomForm>
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
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const BackIconWrapper = styled.div`
  position: absolute;
  flex-direction: column;
  gap: 5px;
  font-size: 35px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  top: 25px;
  left: 25px;
`

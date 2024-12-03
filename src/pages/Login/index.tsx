import styled from "@emotion/styled"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { usePostLogin } from "../../api/usePostLogin"
import CustomButton from "../../components/Button"
import BackButton from "../../components/Button/BackButton"
import { RouterPath } from "../../routes/path"
import { Login } from "../../types"

const LoginForm = () => {
  const { mutate, status } = usePostLogin()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      loginId: "",
      password: "",
    },
    mode: "onSubmit",
  })

  const handleLogin = (data: Login) => {
    mutate(data)
  }

  const handleBack = () => {
    navigate(RouterPath.settings)
  }
  return (
    <Container>
      <BackButton handleBack={handleBack} />
      <CustomForm onSubmit={handleSubmit(handleLogin)}>
        <Title>Login</Title>
        <CustomInput
          type="text"
          placeholder="ID"
          {...register("loginId", { required: "아이디는 필수입니다." })}
        />
        {errors.loginId && <ErrorMessage>{errors.loginId.message}</ErrorMessage>}

        <CustomInput
          type="password"
          placeholder="Password"
          {...register("password", { required: "비밀번호는 필수입니다." })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <ButtonWrapper>
          <CustomButton type="submit" color="red" size="big" disabled={status === "pending"}>
            Login
          </CustomButton>
        </ButtonWrapper>

        {status === "error" && (
          <StatusMessage error>로그인 중 오류가 발생했습니다. 다시 시도해주세요.</StatusMessage>
        )}

        {status === "success" && <StatusMessage success>로그인이 완료되었습니다!</StatusMessage>}
        <SignUpWrapper onClick={() => navigate(RouterPath.signUp)}>SignUp</SignUpWrapper>
      </CustomForm>
    </Container>
  )
}

export default LoginForm

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: auto;
  padding: 50px 10px 60px 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #616161;
  margin-bottom: 40px;
`

const CustomInput = styled.input`
  width: 280px;
  height: 30px;
  margin: 10px auto 20px auto;
  padding: 0 15px;
  border: none;
  border-radius: 10px;
  background-color: #eaeaea;
`

const SignUpWrapper = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: gray;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`
const StatusMessage = styled.p<{ error?: boolean; success?: boolean }>`
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.error ? "#ef4444" : props.success ? "#22c55e" : "gray")};
`

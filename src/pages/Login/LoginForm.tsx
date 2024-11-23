import styled from "@emotion/styled"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { usePostLogin } from "../../api/usePostLogin"
import CustomButton from "../../components/Button"
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

  return (
    <FormContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit(handleLogin)}>
        <StyledInput
          type="text"
          placeholder="아이디"
          {...register("loginId", { required: "아이디는 필수입니다." })}
        />
        {errors.loginId && <ErrorMessage>{errors.loginId.message}</ErrorMessage>}

        <StyledInput
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: "비밀번호는 필수입니다." })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <CustomButton type="submit" color="red" size="big" disabled={status === "pending"}>
          로그인
        </CustomButton>
        {status === "error" && (
          <StatusMessage error>로그인 중 오류가 발생했습니다. 다시 시도해주세요.</StatusMessage>
        )}

        {status === "success" && <StatusMessage success>로그인이 완료되었습니다!</StatusMessage>}
      </form>
      <SignUpWrapper onClick={() => navigate(RouterPath.signUp)}>SignUp</SignUpWrapper>
    </FormContainer>
  )
}

export default LoginForm

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`
const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #616161;
`

const StyledInput = styled.input`
  width: 80%;
  height: 40px;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: black;
`
const StatusMessage = styled.p<{ error?: boolean; success?: boolean }>`
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.error ? "#ef4444" : props.success ? "#22c55e" : "gray")};
`
const SignUpWrapper = styled.div`
  margin-top: 16px;
  font-size: 14px;
  width: 100px;
  color: gray;
`

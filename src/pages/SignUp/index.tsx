import styled from "@emotion/styled"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { usePostRegister } from "../../api/user/usePostRegister"
import CustomButton from "../../components/Button"
import BackButton from "../../components/Button/BackButton"
import { RouterPath } from "../../routes/path"
import { Register } from "../../types"

const SignUp = () => {
  const { mutate, status } = usePostRegister()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      loginId: "",
      password: "",
      email: "",
      name: "",
    },
    mode: "onSubmit",
  })

  const handleRegister = (data: Register) => {
    mutate(data)
  }

  return (
    <Container>
      <BackButton handleBack={handleBack} />
      <CustomForm onSubmit={handleSubmit(handleRegister)}>
        <Title>Sign Up</Title>
        <CustomInput
          {...register("loginId", { required: "아이디는 필수입니다." })}
          placeholder="Login ID"
        />
        {errors.loginId && <ErrorMessage>{errors.loginId.message}</ErrorMessage>}

        <CustomInput
          {...register("password", { required: "비밀번호는 필수입니다." })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <CustomInput
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: { value: /^\S+@\S+$/i, message: "유효한 이메일이 아닙니다." },
          })}
          placeholder="Email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <CustomInput {...register("name", { required: "이름은 필수입니다." })} placeholder="Name" />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <ButtonWrapper>
          <CustomButton color="red" size="small" type="submit" disabled={status === "pending"}>
            {status === "pending" ? "가입 처리중..." : "Create an account"}
          </CustomButton>
        </ButtonWrapper>

        {status === "error" && (
          <StatusMessage error>회원가입 중 오류가 발생했습니다. 다시 시도해주세요.</StatusMessage>
        )}

        {status === "success" && <StatusMessage success>회원가입이 완료되었습니다!</StatusMessage>}
      </CustomForm>
    </Container>
  )
}

export default SignUp

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  background-color: var(--color-gray);
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

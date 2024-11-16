import styled from "@emotion/styled"
import { useForm } from "react-hook-form"
import { usePostRegister } from "../../api/usePostRegister"
import { Register } from "../../types"

const SignUp = () => {
  const { mutate, status } = usePostRegister()

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
      <CustomForm onSubmit={handleSubmit(handleRegister)}>
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

        <CustomButton type="submit" disabled={status === "pending"}>
          {status === "pending" ? "가입 처리중..." : "회원가입"}
        </CustomButton>

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
  height: 100%;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
`

const CustomInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 8px 0;
  padding: 8px;
  color: black;
`

const CustomButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 16px;
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

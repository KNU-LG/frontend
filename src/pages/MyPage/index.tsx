import styled from "@emotion/styled"
import { Suspense } from "react"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../routes/path"
import { ErrorBoundary } from "react-error-boundary"
import { useGetProfile } from "../../api/useGetProfile"
import CustomButton from "../../components/Button"

const MyPageContext = () => {
  const token = localStorage.getItem("accessToken")
  const { data } = useGetProfile(token!)

  const navigate = useNavigate()
  const handleBack = () => {
    navigate(RouterPath.settings)
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate(RouterPath.home)
  }

  return (
    <Container>
      <BackIconWrapper onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </BackIconWrapper>
      <CustomForm>
        <Title>Profile</Title>
        <Avatar />
        <UserInfo>
          <Name>{data?.data.name}</Name>
          <UserDetail>
            <Label>ID</Label>
            <Value>{data?.data.loginId}</Value>
          </UserDetail>
          <UserDetail>
            <Label>Email</Label>
            <Value>{data?.data.email}</Value>
          </UserDetail>
        </UserInfo>
        <ButtonWrapper>
          <CustomButton color="red" size="small">
            Change Password
          </CustomButton>
          <CustomButton color="black" size="small" onClick={handleLogout}>
            Logout
          </CustomButton>
        </ButtonWrapper>
      </CustomForm>
    </Container>
  )
}

const MyPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <MyPageContext />
      </Suspense>
    </ErrorBoundary>
  )
}

export default MyPage

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
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

const CustomForm = styled.div`
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

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f2f2f2;
  margin-bottom: 20px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`

const Name = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #5a5a5a;
  margin-bottom: 25px;
`

const UserDetail = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #5a5a5a;
`

const Value = styled.span`
  font-size: 14px;
  color: #5a5a5a;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

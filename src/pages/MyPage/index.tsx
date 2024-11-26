import React from "react"
import styled from "@emotion/styled"
import { Profile } from "../../types"
import { useGetProfile } from "../../api/useGetProfile"
import CustomButton from "../../components/Button"

const MyPage = () => {
  const  {data, status} = useGetProfile()

  const 

  return (
    <Container>
      <CustumForm>
        <Title>Profile</Title>


        <CustomButton color="red" size="small">
          Change Password
        </CustomButton>
        <CustomButton color="black" size="small">
          Logout
        </CustomButton>
      </CustumForm>
    </Container>
  )
}

export default MyPage

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f2f2f2;
`

const CustumForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  padding: 60px 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #616161;
`

const Name = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`

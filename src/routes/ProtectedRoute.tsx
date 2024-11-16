import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getDynamicPath, RouterPath } from "./path"

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = window.location.pathname
    if (!accessToken && currentPath !== `${RouterPath.login}`) {
      alert("로그인 후 이용해주세요.")
      navigate(getDynamicPath.login())
    }
  }, [accessToken, navigate])

  return accessToken ? <Outlet /> : null
}

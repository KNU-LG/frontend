import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

export const DimmingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDimmed, setIsDimmed] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  const resetDimming = () => {
    setIsDimmed(false)
    setLastActivity(Date.now())
  }

  useEffect(() => {
    const handleActivity = () => {
      resetDimming()
    }

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("touchstart", handleActivity)
    window.addEventListener("click", handleActivity)

    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity
      if (inactiveTime >= 10000 && !isDimmed) {
        setIsDimmed(true)
      }
    }, 1000)

    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
      window.removeEventListener("click", handleActivity)
      clearInterval(interval)
    }
  }, [lastActivity, isDimmed])

  return (
    <>
      <div
        style={{
          filter: isDimmed ? "brightness(0.8)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {children}
      </div>
      {isDimmed && <DimmingOverlay />}
    </>
  )
}

const DimmingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 1000;
  transition: background-color 0.3s ease;
  width: 100vw;
  height: 100vh;
`

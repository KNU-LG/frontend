export type Register = {
  email: string
  password: string
  name: string
  loginId: string
}

export type Login = {
  loginId: string
  password: string
}

export type Schedule = {
  calendarId: number
  date: string
  title: string
  content: string
}

export type ScheduleResponse = {
  date: string
  id: number
  title: string
  content: string
}

export type UserResponse = {
  token: string
}

export type APIResponse<T> = {
  message: string
  error: string
  statusCode: number
  data: T
}

export type Widget = {
  type: string
  size: "L" | "M" | "S"
  key: number
}

export type CalendarResponse = {
  id: number
  settingCommon: {
    id: number
    positionX: number
    positionY: number
    size: "L" | "M" | "S"
  }
}

export type Calendar = {
  settingCommon: {
    positionX: number
    positionY: number
    size: "L" | "M" | "S"
  }
}

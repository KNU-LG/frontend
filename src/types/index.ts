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

export type UserResponse = {
  message: string
  error: string
  statausCode: number
  data: {
    token: string
  }
}

export type APIErrorResponse = {
  message: string
  error: string
  statusCode: number
  data: null
}

export type Widget = {
  type: string
  size: "L" | "M" | "S"
  key: string
}

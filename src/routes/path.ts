export const RouterPath = {
  root: "/",
  home: "/",
  imageSlides: "image-slides",
  images: "images",
  login: "login",
  settings: "settings",
  widgets: "widgets",
  signUp: "sign-up",
  myPage: "my-page",
  notFound: "*",
}

export const getDynamicPath = {
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.pathname
    return `#/${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

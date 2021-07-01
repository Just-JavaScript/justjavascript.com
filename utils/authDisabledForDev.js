const disableLoginForDev =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_DISABLE_LOGIN_FOR_DEV === 'true'

export default disableLoginForDev

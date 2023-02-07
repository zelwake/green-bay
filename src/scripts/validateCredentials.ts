const validateCredentials = (username: string, password: string): boolean => {
  if (username && password && username.length >= 8 && password.length >= 6) {
    if (
      /\d/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password)
    ) {
      return true
    }
  }
  return false
}

export default validateCredentials

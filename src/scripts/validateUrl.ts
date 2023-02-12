export default function validateUrl(string: string): boolean {
  let givenURL
  try {
    givenURL = new URL(string)
  } catch (error) {
    console.log('error is', error)
    return false
  }
  return true
}

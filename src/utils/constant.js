export const VERIFICATION_API_KEY = 987654
export const API_CONTENT_TYPE = 'application/x-www-form-urlencoded'
export const API_BASE_URL = 'http://api.transfermelon.com/index.php/v1/api/'
export const HEADER = {
  'x-api-key': VERIFICATION_API_KEY,
  'content-type': API_CONTENT_TYPE,
}
export const EMAIL_HEADER = {
  'x-api-key': '987655',
  'content-type': API_CONTENT_TYPE,
}
export const API_EMAIL_BASE_URL =
  'http://mosquepay.org/mosquepayapi/v1/api/email_message'

export const retrieveFromLocalStorage = (keys) => {
  const data = {}
  keys.forEach((key) => {
    const persistedState = sessionStorage.getItem(key)
    data[key] = persistedState ? JSON.parse(persistedState) : null
  })

  return data
}

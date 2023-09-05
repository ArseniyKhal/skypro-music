let accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzOTA4NzM0LCJpYXQiOjE2OTM5MDg0MzQsImp0aSI6ImQ3OTM0N2VkNzgzNTRmZDk5NzU0OWZkZDAxN2YyOGYwIiwidXNlcl9pZCI6MTE4MH0.oAXknC-y6wpnrulPDZaUQD1D3HnAvVqwWIcFtdG71SA'
const refToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5Mzk5NDgzNCwiaWF0IjoxNjkzOTA4NDM0LCJqdGkiOiJlYjUzYTg3ZmIwMmM0NmEyOGYwNWY3OGQyYTYyNTFhNCIsInVzZXJfaWQiOjExODB9.ZT-vOZToiiHY0pRTVT0uH1oCjY5GHwllkunuY7MeGxM'

const emailUser = 'yellow@cat.ru'
const passwordUser = '8symbol!'
const usernameUser = 'yellowCat'

console.log(accessToken)

// Получить список треков
export async function getPlaylist() {
  const response = await fetch(
    'https://painassasin.online/catalog/track/all/',
    {
      method: 'GET',
    },
  )
  const data = await response.json()
  return data
}

// Регистрация
export async function registration() {
  const response = await fetch('https://painassasin.online/user/signup/', {
    method: 'POST',
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser,
      username: usernameUser,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

// Авторизация
export async function login() {
  const response = await fetch('https://painassasin.online/user/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

// Получить токен
export async function getToken() {
  const response = await fetch('https://painassasin.online/user/token/', {
    method: 'POST',
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

// Обновить токен
export async function refreshToken() {
  const response = await fetch(
    'https://painassasin.online/user/token/refresh/',
    {
      method: 'POST',
      body: JSON.stringify({
        refresh: refToken,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  accessToken = await response.json().then()
}

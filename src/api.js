// const accessToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE'

// Получить список треков
export async function getPlaylist() {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/catalog/track/all/',
    { method: 'GET' },
  )
  return response.json()
}

// Авторизация
export async function login({ email, password }) {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/user/login/',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  return response
}

// Регистрация
export async function registration({ email, password }) {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/user/signup/',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username: email,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  return response
}

// Получить список избранных треков
export async function getFavoriteList(accessToken) {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return response.json()
}

// Получить токен
export async function getToken() {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/user/token/',
    {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.test',
        password: 'test@test.test',
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
  return response
}

// Обновить токен
// export async function refreshToken() {
//   const response = await fetch(
//     'https://skypro-music-api.skyeng.tech/user/token/refresh/',
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         refresh: refToken,
//       }),
//       headers: {
//         'content-type': 'application/json',
//       },
//     },
//   )
//   accessToken = await response.json().then()
// }

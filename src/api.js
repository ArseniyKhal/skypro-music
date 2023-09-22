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
  console.log(response)

  return response
}

// Получить токен
// export async function getToken() {
//   const response = await fetch(
//     'https://skypro-music-api.skyeng.tech/user/token/',
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         email: emailUser,
//         password: passwordUser,
//       }),
//       headers: {
//         'content-type': 'application/json',
//       },
//     },
//   )
//   const data = await response.json()
//   return data
// }

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

const emailUser = 'yellow@cat.ru'
const passwordUser = '8symbol!'
const usernameUser = 'yellowCat'

// Получить список треков
export async function getPlaylist() {
  const response = await fetch(
    'https://painassasin.online/catalog/track/all/',
    {
      method: 'GET',
    },
  )
  if (!response.ok) {
    console.log('ошибка!')
    throw new Error('Не удалось загрузить плейлист')
  }
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
// export async function refreshToken() {
//   const response = await fetch(
//     'https://painassasin.online/user/token/refresh/',
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

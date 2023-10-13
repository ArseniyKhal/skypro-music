// Получить список треков
export async function getPlaylist() {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/catalog/track/all/',
    { method: 'GET' },
  )
  return response.json()
}

// Авторизация + tokens
export async function login({ email, password }) {
  const [loginRes, tokenRes] = await Promise.all([
    fetch('https://skypro-music-api.skyeng.tech/user/login/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }),
    fetch('https://skypro-music-api.skyeng.tech/user/token/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }),
  ])
  const loginJsonData = await loginRes.json()
  const tokenJsonData = await tokenRes.json()
  if (!loginRes.ok) {
    throw new Error(loginJsonData.detail ?? 'ошибка сервера')
  }
  if (!tokenRes.ok) {
    throw new Error(tokenJsonData.detail ?? 'ошибка сервера')
  }
  return { ...loginJsonData, ...tokenJsonData }
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

// Обновить токен
export async function refreshToken(refToken) {
  const response = await fetch(
    'https://skypro-music-api.skyeng.tech/user/token/refresh/',
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
  return response.json()
}

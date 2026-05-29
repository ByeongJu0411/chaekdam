interface LoginBody {
  email: string
  password: string
}

interface SignupBody {
  email: string
  password: string
  name: string
}

export async function login(body: LoginBody) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('로그인에 실패했습니다.')
  return res.json()
}

export async function signup(body: SignupBody) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('회원가입에 실패했습니다.')
  return res.json()
}

export async function logout() {
  const res = await fetch('/api/auth/logout', { method: 'POST' })
  if (!res.ok) throw new Error('로그아웃에 실패했습니다.')
}

export async function findPassword(email: string) {
  const res = await fetch('/api/auth/find-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error('비밀번호 찾기에 실패했습니다.')
  return res.json()
}

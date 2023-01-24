import type {User} from "@/model/types";

const baseUrl = "http://qreach.adamradvan.eu"

export function login(email: string, password: string, tenantId: string): Promise<User>  {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password, tenantId })
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.text().then(s => { throw new Error(s) })
  }).then(json => {
    const user = json as User
    saveUser(user)
    return user
  })
}

export function loadUserData(): Promise<User>  {
  const user = loadUser()
  if (!user)
    return Promise.reject()
  return fetch(`"${baseUrl}/verify"`, {
    method: "POST",
    headers: [["USER_ID_TOKEN", user.idToken]]
  }).then(response => {
    if (response.ok)
      return user
    else
      return Promise.reject()
  })
}

export function saveUser(user: User) {
  document.cookie = `user=${JSON.stringify(user)}`
}

export function loadUser(): User | undefined {
  const cookie = document.cookie.split(';').map(s => s.split(':')).filter(s => s[0] === "idToken")[0]
  if (!cookie)
    return undefined
  const userText = cookie[1]
  if (!userText)
    return undefined
  return JSON.parse(userText) as User
}

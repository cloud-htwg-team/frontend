import type {TenantInformation, User} from "@/model/types";

const baseUrl = location.href.slice(0, -1)

export function login(email: string, password: string, tenantId: string): Promise<User>  {
  return performAuthentication("login", email, password, tenantId)
}

export function register(email: string, password: string, tenantId: string): Promise<User>  {
  return performAuthentication("sign-up", email, password, tenantId)
}

function performAuthentication(endpoint: string, email: string, password: string, tenantId: string): Promise<User> {
  return fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({ email, password, tenantId }),
    headers: [["Content-Type", "application/json"]]
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

export function loadTenants(): Promise<TenantInformation[]> {
  return fetch(`${baseUrl}/tenants`)
    .then(response => {
      if (response.ok)
        return response.json() as Promise<TenantInformation[]>
      else
        return response.text().then(s => { throw new Error(s) })
    })
}

export function createTenant(name: string, logo: string, premium: boolean): Promise<string> {
  return fetch(`${baseUrl}/tenants`, {
    method: "POST",
    body: JSON.stringify({ name, logo, premium })
  }).then(response => {
    if (response.ok)
      return response.text()
    else
      return response.text().then(s => { throw new Error(s) })
  })
}

export function resolveTenantName(name: string): Promise<TenantInformation> {
  return fetch(`${baseUrl}/tenants/name/${name}`)
    .then(response => {
      if (response.ok)
        return response.json() as Promise<TenantInformation>
      else
        return response.text().then(s => { throw new Error(s) })
    })
}

export function loadUserData(): Promise<User> {
  const user = loadUser()
  if (!user)
    return Promise.reject(new Error("No local user data"))
  return fetch(`${baseUrl}/verify`, {
    method: "POST",
    headers: [["USER_ID_TOKEN", user.idToken]]
  }).then(response => {
    if (response.ok)
      return user
    else
      return Promise.reject(new Error("Local user data not accepted"))
  })
}

export function saveUser(user: User) {
  document.cookie = `user=${JSON.stringify(user)}`
}

export function loadUser(): User | undefined {
  const cookie = document.cookie.split('; ').map(s => s.split('=')).filter(s => s[0] === "user")[0]
  if (!cookie)
    return undefined
  const userText = cookie[1]
  if (!userText)
    return undefined
  return JSON.parse(userText) as User
}


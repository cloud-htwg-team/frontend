import type {
  CodeEntry,
  CodeMetadataShort,
  TenantInformationWIthLogo,
  User
} from "@/model/types";


export class BackendConnection {
  private readonly user: User
  private readonly secureUrl: string
  private readonly baseUrl: string

  constructor(user: User) {
    this.user = user
    this.secureUrl = `${location.href}secure`
    this.baseUrl = location.href
  }

  generateQrCode(toGenerate: string): Promise<string> {
    return this.processString(fetch(`${this.secureUrl}/qr-code`, {
      method: "POST",
      headers: [
          ["USER_ID_TOKEN", this.user.idToken],
          ["Content-Type", "application/json"]],
      body: JSON.stringify({
        text: toGenerate,
        tenantId: this.user.tenantId,
        localId: this.user.userId,
        idToken: this.user.idToken
      })
    }))
  }

  getTenantEntries(): Promise<CodeMetadataShort[]> {
    return this.jsonRequest(`${this.secureUrl}/history/tenants/${this.user.tenantId}/entries`) as Promise<CodeMetadataShort[]>
  }

  getUserEntries(): Promise<CodeMetadataShort[]> {
    return this.jsonRequest(`${this.secureUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries`) as Promise<CodeMetadataShort[]>
  }

  getEntry(entryId: string): Promise<CodeEntry> {
    return this.jsonRequest(`${this.secureUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries/${entryId}`) as Promise<CodeEntry>
  }

  getCode(entryId: string): Promise<string> {
    return this.processString(fetch(`${this.secureUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries/${entryId}`, {
      headers: [["USER_ID_TOKEN", this.user.idToken]]
    }))
  }

  getTenantInformation(): Promise<TenantInformationWIthLogo> {
    return this.jsonRequest(`${this.baseUrl}/tenants/${this.user.tenantId}`) as Promise<TenantInformationWIthLogo>
  }

  getTenantLogo(): Promise<string> {
    return this.processString(fetch(`${this.baseUrl}/tenants/${this.user.tenantId}/logo`, {
      headers: [["USER_ID_TOKEN", this.user.idToken]]
    }))
  }

  private jsonRequest(url: string): Promise<any> {
    return fetch(url, {
      headers: [["USER_ID_TOKEN", this.user.idToken]]
    })
      .then(response => {
        if (response.ok)
          return response.json()
        else
          return response.text().then(s => { throw new Error(s) })
      })
  }

  private processString(toProcess: Promise<Response>): Promise<string> {
    return toProcess.then(response => {
      if (response.ok)
        return response.text()
      else
        return response.text().then(s => { throw new Error(s) })
    })
  }
}

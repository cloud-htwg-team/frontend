import type {CodeEntry, CodeMetadataShort, User} from "@/model/types";

const baseUrl = "http://qreach.adamradvan.eu/secure"


export class BackendConnection {
  private readonly user: User

  constructor(user: User) {
    this.user = user
  }

  generateQrCode(toGenerate: string): Promise<string> {
    return this.processString(fetch(`${baseUrl}/qr-code`, {
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
    return this.jsonRequest(`${baseUrl}/history/tenants/${this.user.tenantId}/entries`) as Promise<CodeMetadataShort[]>
  }

  getUserEntries(): Promise<CodeMetadataShort[]> {
    return this.jsonRequest(`${baseUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries`) as Promise<CodeMetadataShort[]>
  }

  getEntry(entryId: string): Promise<CodeEntry> {
    return this.jsonRequest(`${baseUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries/${entryId}`) as Promise<CodeEntry>
  }

  getCode(entryId: string): Promise<string> {
    return this.processString(fetch(`${baseUrl}/history/tenants/${this.user.tenantId}/users/${this.user.userId}/entries/${entryId}`, {
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

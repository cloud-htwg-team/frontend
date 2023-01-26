export interface CodeMetadataShort {
  userId: string
  entryId: string
  createdAt: number
}

export interface CodeMetadataExtended extends CodeMetadataShort {
  tenantId: string
}

export interface CodeEntry extends CodeMetadataExtended {
  qrCode: String
}

export interface User {
  userId: string
  tenantId: string
  idToken: string
}

export interface TenantInformation {
  displayName: string
  tenantId: string
}
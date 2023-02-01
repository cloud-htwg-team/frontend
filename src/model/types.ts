export interface CodeMetadataShort {
  userId: string
  entryId: string
  createdAt: number
}

export interface CodeMetadataExtended extends CodeMetadataShort {
  tenantId: string
}

export interface CodeEntry extends CodeMetadataExtended {
  qrCode: string
}

export interface User {
  userId: string
  tenantId: string
  idToken: string
}

export interface TenantInformation {
  name: string
  tenantId: string
}

export interface TenantInformationWIthLogo extends TenantInformation{
  logo: string
}
export type CompanyType = 'brand' | 'agency' | 'private' | 'other'

export type Client = {
  id: string
  name: string
  companyType: CompanyType
  contactName: string
  email: string
  phone: string
}

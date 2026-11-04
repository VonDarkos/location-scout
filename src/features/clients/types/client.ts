export type CompanyType = "brand" | "agency" | "private" | "other";

export type Client = {
  id: string;
  name: string;
  companyType: CompanyType;
  contactName: string;
  email: string;
  phone: string;
};

export type ClientInput = Omit<Client, "id">;
export type UpdateClientInput = ClientInput

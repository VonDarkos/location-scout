import type { OperationalStatus, ProductionType } from "./project";

export type ProjectFormState = {

      name: string;
      clientId: string;
      startDate: string;
      endDate: string;
      city: string;
      area: string;
      locationBudget: string;
      peopleCount: string;
      description: string;
      notes: string;
      productionType: ProductionType | "";
      operationalStatus: OperationalStatus;
}

export type ProjectFormErrors = Partial<Record<keyof ProjectFormState, string>>

export const initialProjectFormData: ProjectFormState = {
      name: "",
      clientId: "",
      startDate: "",
      endDate: "",
      city: "",
      area: "",
      locationBudget: "",
      peopleCount: "",
      description: "",
      notes: "",
      productionType: "",
      operationalStatus: "none",
}
import type { ProjectLocation } from "../../../shared/types/projectLocation";
import type { Client } from "../../clients/types/client";
import type { Location } from "../../locations/types/location";

export type ProductionType =
  | "fashion"
  | "commercial"
  | "editorial"
  | "product"
  | "video"
  | "event"
  | "other";

export type OperationalStatus = "none" | "paused" | "cancelled";
export type TemporalStatus = "upcoming" | "active" | "completed";

export type Project = {
  id: string;
  name: string;
  clientId: Client["id"];
  startDate: string;
  endDate: string;
  city: string;
  area: string;
  locationBudget: number;
  peopleCount: number;
  description?: string;
  notes?: string;
  productionType: ProductionType ;
  operationalStatus: OperationalStatus ;
};


export type ProjectInput = Omit<Project,"id">
export type CreateProjectInput = ProjectInput
export type UpdateProjectInput = ProjectInput
export type ProjectLocationWithData = {
  relation:ProjectLocation,
  location:Location
}
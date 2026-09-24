import type { Client } from "../../clients/types/client";

export type ProductionType =
  | "fashion"
  | "commercial"
  | "editorial"
  | "product"
  | "video"
  | "event"
  | "other";

export type OperationalStatus = "none" | "paused" | "cancelled";
export type TemporalStatus = "upcoming" | "active" | "completed"

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
  operationalStatus: OperationalStatus;
};


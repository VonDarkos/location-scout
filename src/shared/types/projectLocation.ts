import type { Location } from "../../features/locations/types/location";
import type { Project } from "../../features/projects/types/project";

export type ProjectLocationStatus = "candidate" | "approved" | "rejected";

export type ProjectLocation = {
  id: string;
  projectId: Project["id"];
  locationId: Location["id"];
  status: ProjectLocationStatus;
  order?: number | null;
  addedAt: string;
};

export type UpdateProjectLocationInput = Partial<Pick<ProjectLocation, "status" | "order">>;
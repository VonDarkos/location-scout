import type { ProjectLocation } from "../../../shared/types/projectLocation";
import type { Location } from "../../locations/types/location";
import type { ProjectLocationWithData } from "../types/project";

export default function joinProjectLocations(projectLocations:ProjectLocation[], locations:Location[]):ProjectLocationWithData[] {

    return projectLocations
      .map((relation)=>{
        const location = locations.find((location)=>location.id === relation.locationId)
        return {relation, location}
      })
      .filter((item): item is ProjectLocationWithData => item.location !== undefined)
}

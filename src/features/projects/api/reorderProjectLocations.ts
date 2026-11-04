import type { ProjectLocation } from "../../../shared/types/projectLocation"
import updateProjectLocation from "./updateProjectLocation"

export type ProjectLocationOrderUpdate = {
    relationId:ProjectLocation["id"],
    order:number
}

export default async function reorderProjectLocations(updates:ProjectLocationOrderUpdate[]):Promise<ProjectLocation[]> {

    const updatedRelations = await Promise.all(
        updates.map(({relationId,order})=>updateProjectLocation(relationId,{order}))
    )

    return updatedRelations
}

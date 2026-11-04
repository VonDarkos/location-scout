import type { Location } from "../../locations/types/location"

export default function getRecentLocations(locations:Location[]):Location[] {

    const newLocationList = [...locations]
    const sortedLocations = newLocationList.sort((a,b)=>
       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,3)

    
    return sortedLocations
}

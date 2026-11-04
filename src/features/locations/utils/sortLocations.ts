
import type { Location } from "../types/location";

export default function sortLocations(
  locations: Location[],
  sort: string,
): Location[] {
  return [...locations].sort((a,b)=>{

    if(sort === "name-asc"){
      return a.name.localeCompare(b.name)
    }
    if(sort==="name-desc"){
      return b.name.localeCompare(a.name)
    }

    if(sort==="asc-price"){
      return a.dailyPrice - b.dailyPrice
    }
    if(sort==="desc-price"){
      return b.dailyPrice - a.dailyPrice
    }

    if(sort === "capacity-asc"){
      return a.capacity - b.capacity
    }
    if(sort === "capacity-desc"){
      return b.capacity - a.capacity
    }

    if(sort=== "surface-asc"){
      return a.surface - b.surface
    }
    if(sort === "surface-desc"){
      return b.surface - a.surface
    }


    return 0
  })
}
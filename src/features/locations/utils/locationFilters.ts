import type { Location } from "../types/location";

export function matchesEnvironment (
    localEnvironment:string,
    filterEnvironment:string,

): boolean {
    return(
    filterEnvironment === "all" ||
     localEnvironment === filterEnvironment ||
    (localEnvironment === "both" && (filterEnvironment === "indoor" || filterEnvironment === "outdoor"))
    );
}


export function matchesPrice(
  dailyPrice: number,
  price: string,
): boolean {
  if(price==="under-1000") return dailyPrice <1000;
      else if(price==="1000-2000") return dailyPrice>=1000 && dailyPrice<=2000;
      else if(price==="over-2000") return dailyPrice>2000;
      else return price === "all"
}

export function matchesCapacity(
    capacity:number,
    capacityUrl:string

):boolean{
    if(capacityUrl === "under-10") return capacity<10;
      else if(capacityUrl==="10-25") return capacity>=10 && capacity<=25;
      else if(capacityUrl==="26-50") return capacity>=26 && capacity<=50;
      else if(capacityUrl==="over-50") return capacity>50;
      else return capacityUrl === "all"
}

export function matchesSurface(
    surface:number,
    surfaceUrl:string
):boolean{
    if(surfaceUrl === "under-50") return surface<50;
      else if(surfaceUrl==="50-100") return surface>=50 && surface<=100;
      else if(surfaceUrl==="101-250") return surface>100 && surface<=250;
      else if(surfaceUrl==="over-250") return surface>250;
      else return surfaceUrl === "all"
}

type LocationFilters = {
    search:string,
    type:string,
    city:string,
    environment:string,
    price:string,
    capacity:string,
    surface:string,
}

export function filterLocations(
    locations:Location[],
    {search,type,city,environment,price,capacity,surface}:LocationFilters
):Location[]{
    return locations.filter((location)=>{

    const nameFiltered = location.name.toLowerCase().includes(search.toLowerCase())
    const typeFiltered = type === "all" || location.type === type
    const cityFiltered = city === "all" || location.city === city
    const environmentFiltered = matchesEnvironment(location.environment,environment)
    const priceFiltered = matchesPrice(location.dailyPrice,price)
    const capacityFiltered = matchesCapacity(location.capacity,capacity)
    const surfaceFiltered = matchesSurface(location.surface,surface)

    return nameFiltered && typeFiltered&&cityFiltered&&environmentFiltered && priceFiltered && capacityFiltered && surfaceFiltered
  })
}
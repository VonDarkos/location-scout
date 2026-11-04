import type React from "react"
import { useSearchParams } from "react-router"


export default function useLocationFiltersParams(){

  const [params,setParams]  = useSearchParams()

  const search  = params.get("search") || ""
  const type = params.get("type") || "all"
  const city = params.get("city")|| "all"
  const environment = params.get("environment") || "all"
  const price = params.get("price") || "all"
  const capacity = params.get("capacity") || "all"
  const surface = params.get("surface") || "all"
  const sort = params.get("sort") || "none"

  const readSearch  = (e:React.ChangeEvent<HTMLInputElement>)=>{setParams((prev)=>{
    prev.set("search",e.target.value)
    return prev
  },{replace:true})}

  const readType = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("type",e.target.value)
    return prev
  })}

  const readCity = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("city",e.target.value)
    return prev
  })}

  const readEnvironment = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("environment",e.target.value)
    return prev
  })}

  const readPrice = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("price",e.target.value)
    return prev
  })}

  const readCapacity = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("capacity",e.target.value)
    return prev
  })}

  const readSurface = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("surface",e.target.value)
    return prev
  })}

  const readSort = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("sort",e.target.value)
    return prev
  })}

  const handleResetFilters = ()=>{setParams((prev)=>{
    prev.delete("search")
    prev.delete("type")
    prev.delete("city")
    prev.delete("environment")
    prev.delete("price")
    prev.delete("capacity")
    prev.delete("surface")
    return prev
  })}

  return{
    search,type,city,environment,price,capacity,surface,sort,
    readSearch,readType,readCity,readEnvironment,readPrice,readCapacity,readSurface,readSort,
    handleResetFilters
  }
}

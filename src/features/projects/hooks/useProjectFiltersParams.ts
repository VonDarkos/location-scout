import type React from 'react'
import { useSearchParams } from 'react-router'

export default function useProjectFiltersParams() {

    const [params,setParams]=useSearchParams()
    const search = params.get("search")||""
    const client = params.get("client") || "all"
    const budget = params.get("budget") || "all"
    const temporalStatus = params.get("temporalStatus")|| "all"
    const operationalStatus = params.get("operationalStatus")|| "all"
    const sort = params.get("sort")|| "none"

  const readSearch  = (e:React.ChangeEvent<HTMLInputElement>)=>{setParams((prev)=>{
    prev.set("search",e.target.value)
    return prev
  },{replace:true})}

  const readClient = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("client",e.target.value)
    return prev
  })}

  const readBudget = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("budget",e.target.value)
    return prev
  })}

  const readTemporalStatus = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("temporalStatus",e.target.value)
    return prev
  })}

  const readOperationalStatus = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("operationalStatus",e.target.value)
    return prev
  })}

  const readSort = (e:React.ChangeEvent<HTMLSelectElement>)=>{setParams((prev)=>{
    prev.set("sort",e.target.value)
    return prev
  })}

  const handleResetFilters = ()=>{setParams((prev)=>{
    prev.delete("search")
    prev.delete("client")
    prev.delete("budget")
    prev.delete("temporalStatus")
    prev.delete("operationalStatus")
    return prev
  })}

  return{
    search,client,budget,temporalStatus,operationalStatus,sort,
    readSearch,readClient,readBudget,readTemporalStatus,readOperationalStatus,readSort,
    handleResetFilters
  }
}

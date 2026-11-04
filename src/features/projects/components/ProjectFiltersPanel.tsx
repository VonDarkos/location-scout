import type React from "react"
import type { Client } from "../../clients/types/client"

type ProjectFiltersPanelProps = {

    search:string,
    client:string,
    budget:string,
    temporalStatus:string,
    operationalStatus:string,
    sort:string,
    clients:Client[]

    onSearchChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    onClientChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onBudgetChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onTemporalStatusChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onOperationalStatusChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onSortChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onResetFilters:()=>void;
}



export default function ProjectFiltersPanel({
    search,
    client,
    budget,
    temporalStatus,
    operationalStatus,
    sort,
    clients,
    onSearchChange,
    onClientChange,
    onBudgetChange,
    onTemporalStatusChange,
    onOperationalStatusChange,
    onSortChange,
    onResetFilters,
}:ProjectFiltersPanelProps) {

 
  return (
    <div className="filters">
      <label className="filter filter-search">
        Search
        <input type="text" value={search} onChange={onSearchChange} placeholder="Search by project name" />
      </label>

      <label className="filter">
        Client
        <select value={client} onChange={onClientChange}>
            <option value="all">All</option>
            {(clients ?? []).map((clientOption)=>
            <option key={clientOption.id} value={clientOption.id}>{clientOption.name}</option>
            )}
        </select>
      </label>

      <label className="filter">
        Budget
        <select value={budget} onChange={onBudgetChange}>
            <option value="all">All</option>
            <option value="under-1000">Under 1000€</option>
            <option value="1000-2500">1000-2500€</option>
            <option value="2501-5000">2501-5000€</option>
            <option value="over-5000">Over 5000€</option>
        </select>
      </label>

      <label className="filter">
        Timeline
        <select value={temporalStatus} onChange={onTemporalStatusChange}>
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
        </select>
      </label>

      <label className="filter">
        Operational status
        <select value={operationalStatus} onChange={onOperationalStatusChange}>
            <option value="all">All</option>
            <option value="none">None</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
        </select>
      </label>

      <label className="filter">
        Sort by
        <select value={sort} onChange={onSortChange}>
            <option value="none">None</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
            <option value="startDate-asc">Start Date (Earliest)</option>
            <option value="startDate-desc">Start Date (Latest)</option>
            <option value="budget-asc">Low Budget</option>
            <option value="budget-desc">High Budget</option>
            <option value="client-asc">Client A-Z</option>
            <option value="client-desc">Client Z-A</option>
        </select>
      </label>

      <button type="button" className="btn btn-secondary" onClick={onResetFilters}>Reset Filters</button>
    </div>
  )
}

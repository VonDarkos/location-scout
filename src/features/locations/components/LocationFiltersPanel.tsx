import React from "react"

type LocationFiltersPanelProps = {

    search:string,
    type:string,
    city:string,
    price:string,
    environment:string,
    capacity:string,
    surface:string,
    sort:string,
    cities:string[]

    onSearchChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    onTypeChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onCityChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onEnvironmentChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onPriceChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onCapacityChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onSurfaceChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onSortChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
    onResetFilters:()=>void;
}


export default function LocationFiltersPanel({
    search,
    type,
    city,
    environment,
    price,
    capacity,
    surface,
    sort,
    cities,
    onSearchChange,
    onTypeChange,
    onCityChange,
    onEnvironmentChange,
    onPriceChange,
    onCapacityChange,
    onSurfaceChange,
    onSortChange,
    onResetFilters,
}:LocationFiltersPanelProps) {
  return (
    <div className="filters">
      <label className="filter filter-search">
        Search
        <input type="text" value={search} onChange={onSearchChange} placeholder="Search by name" />
      </label>

      <label className="filter">
        Type
        <select value={type} onChange={onTypeChange}>
            <option value="all">All</option>
            <option value="studio">Studio</option>
            <option value="loft">Loft</option>
            <option value="villa">Villa</option>
            <option value="warehouse">Warehouse</option>
            <option value="office">Office</option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Restaurant</option>
            <option value="outdoor-space">Outdoor-space</option>
            <option value="other">Other</option>
        </select>
      </label>

      <label className="filter">
        City
        <select value={city} onChange={onCityChange}>
            <option value="all">All</option>
            {cities.map((city)=>
            <option key={city}  value={city}>{city}</option>
            )}
        </select>
      </label>

      <label className="filter">
        Environment
        <select value={environment} onChange={onEnvironmentChange}>
            <option value="all">All</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="both">Both</option>
        </select>
      </label>

      <label className="filter">
        Price
        <select value={price} onChange={onPriceChange}>
            <option value="all">All</option>
            <option value="under-1000">Under 1000€</option>
            <option value="1000-2000">1000-2000€</option>
            <option value="over-2000">Over-2000</option>
        </select>
      </label>

      <label className="filter">
        Capacity
        <select value={capacity} onChange={onCapacityChange}>
            <option value="all">All</option>
            <option value="under-10">Under 10</option>
            <option value="10-25">10-25</option>
            <option value="26-50">26-50</option>
            <option value="over-50">Over 50</option>
        </select>
      </label>

      <label className="filter">
        Surface
        <select value={surface} onChange={onSurfaceChange}>
            <option value="all">All</option>
            <option value="under-50">Under 50 m²</option>
            <option value="50-100">50-100 m²</option>
            <option value="101-250">101-250 m²</option>
            <option value="over-250">Over 250 m²</option>
        </select>
      </label>

      <label className="filter">
        Sort by
        <select value={sort} onChange={onSortChange}>
            <option value="none">None</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
            <option value="asc-price">Low Price</option>
            <option value="desc-price">High Price</option>
            <option value="capacity-asc">Low Capacity</option>
            <option value="capacity-desc">High Capacity</option>
            <option value="surface-asc">Low Surface</option>
            <option value="surface-desc">High Surface</option>
        </select>
      </label>

      <button type="button" className="btn btn-secondary" onClick={onResetFilters}>Reset Filters</button>
    </div>
  )
}

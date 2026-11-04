import { Link } from "react-router"
import usePageTitle from "../shared/hooks/usePageTitle"
import useLocationsQuery from "../features/locations/hooks/useLocationsQuery"
import useLocationFiltersParams from "../features/locations/hooks/useLocationFiltersParams"
import useFavoriteLocationsStore from "../features/locations/store/useFavoriteLocationsStore"
import { filterLocations } from "../features/locations/utils/locationFilters"
import sortLocations from "../features/locations/utils/sortLocations"
import LocationCard from "../features/locations/components/LocationCard"
import LocationFiltersPanel from "../features/locations/components/LocationFiltersPanel"
export default function LocationsPage() {
  usePageTitle("Locations")

  const favoriteLocationIds = useFavoriteLocationsStore((state)=>state.favoriteLocationIds)
  const toggleFavorite = useFavoriteLocationsStore((state)=>state.toggleFavorite)
  const{data,isPending,isError,error}=useLocationsQuery() /*LI CHIAMO DA USELOCATIONQUERY E FACCIO I POSSIBILI CASI*/ 
  const {
    search,type,city,environment,price,capacity,surface,sort,
    readSearch,readType,readCity,readEnvironment,readPrice,readCapacity,readSurface,readSort,
    handleResetFilters
  } = useLocationFiltersParams()


  if(isPending){
    return <p className="state" role="status">Loading...</p> /* CARICAMENTO...*/
  }

  if(isError){
    return <p className="state state-error" role="alert">{error?.message}</p> /* ERRORE NEL CARICAMENTO*/
  }

  if(data?.length===0){           /*SE IL NUMERO DELLE LOCATIONS CARICATE SONO UGUALI A 0*/
    return (
      <>
        <div className="page-header">
          <h1>Locations</h1>
          <Link to="/locations/new" className="btn btn-primary">New Location</Link>
        </div>
        <p className="empty">No locations found</p>
      </>
    )
  }

  const cities = [...new Set(data?.map((location)=>location.city)??[])]
  
  

  const locationFiltered = filterLocations(data ?? [],{search,type,city,environment,price,capacity,surface})

  const sortedLocations = sortLocations(locationFiltered,sort)

  
    


  return (
    <>
    <div className="page-header">
      <h1>Locations</h1>
      <Link to="/locations/new" className="btn btn-primary">New Location</Link>
    </div>
    <LocationFiltersPanel
      search={search}
      type={type}
      city={city}
      environment={environment}
      price={price}
      capacity={capacity}
      surface={surface}
      sort={sort}
      cities={cities}
      onSearchChange={readSearch}
      onTypeChange={readType}
      onCityChange={readCity}
      onEnvironmentChange={readEnvironment}
      onPriceChange={readPrice}
      onCapacityChange={readCapacity}
      onSurfaceChange={readSurface}
      onSortChange={readSort}
      onResetFilters={handleResetFilters}
    />

    {sortedLocations.length > 0 ? (
      <div>
        <p className="results-count" role="status">{sortedLocations.length} locations found</p>
        <div className="location-grid">
        {sortedLocations.map((location) => {
          const isFavorite = favoriteLocationIds.includes(location.id);
          return (
           
              <LocationCard key={location.id} location={location} isFavorite={isFavorite} onToggleFavorite={()=>toggleFavorite(location.id)} />
        
          );
        })}
        </div>
      </div>
    ) : (
      <div className="empty">
        <p>No locations match the current filters.</p>
        <button type="button" className="btn btn-secondary" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    )}
        
        </>
        
        
      )
    }

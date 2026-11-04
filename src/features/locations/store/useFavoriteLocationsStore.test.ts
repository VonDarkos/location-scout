import { describe, test, expect, beforeEach } from "vitest"
import useFavoriteLocationsStore from "./useFavoriteLocationsStore"


describe("Favorite Locations Store", () => {

  beforeEach(() => {
    useFavoriteLocationsStore.setState({
      favoriteLocationIds: []
    })
  })

  test("aggiunge una location ai preferiti", () => {

   useFavoriteLocationsStore.getState().toggleFavorite("loc-1")

    const currentFavorites = useFavoriteLocationsStore.getState().favoriteLocationIds
    
    expect(currentFavorites).toContain("loc-1")
        
  })

  test("rimuovere preferito", ()=>{
    useFavoriteLocationsStore.getState().toggleFavorite("loc-1")
    useFavoriteLocationsStore.getState().toggleFavorite("loc-1")
    const currentFavorites = useFavoriteLocationsStore.getState().favoriteLocationIds
    expect(currentFavorites).toEqual([])
  })

  test("clear favorites" , ()=>{
    useFavoriteLocationsStore.getState().toggleFavorite("loc-1")
    useFavoriteLocationsStore.getState().toggleFavorite("loc-2")
    useFavoriteLocationsStore.getState().clearFavorites()
     const currentFavorites = useFavoriteLocationsStore.getState().favoriteLocationIds
    expect(currentFavorites).toEqual([])
  })

  test('persist testing', () => {
  
    useFavoriteLocationsStore.getState().toggleFavorite('loc-1')
    
    const savedFavorites = localStorage.getItem('favorite-storage')
    
    expect(savedFavorites).not.toBeNull()


    
   if (savedFavorites === null) {
  throw new Error("Favorites not saved")
}

const savedData = JSON.parse(savedFavorites)

    
    
    expect(savedData.state.favoriteLocationIds).toContain('loc-1')
  })
  })


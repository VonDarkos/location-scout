import { create } from "zustand";
import { persist } from "zustand/middleware";
type FavoriteLocationsStore = {
    favoriteLocationIds : string[]
    toggleFavorite : (locationId:string)=>void
    clearFavorites : ()=>void
}




 const useFavoriteLocationsStore = create<FavoriteLocationsStore>()(persist((set)=>({
    favoriteLocationIds: [],
    toggleFavorite : (locationId)=>{
        set((state)=>{
                const isFavorite = state.favoriteLocationIds.includes(locationId)
                return{favoriteLocationIds:isFavorite ? state.favoriteLocationIds.filter((id)=>id!==locationId):
                    [...state.favoriteLocationIds, locationId]
                }
        })
    },
    clearFavorites:()=>set({
        favoriteLocationIds:[]
    })
}),{name:"favorite-storage"}))

export default useFavoriteLocationsStore
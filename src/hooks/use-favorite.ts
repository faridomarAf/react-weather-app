import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FavoriteCities } from "../types/types"
import { useLocalStorage } from "./use-local-storage"

export const useFavorite = ()=>{
    const [favorites, setFavorites] = useLocalStorage<FavoriteCities[]>("favorites", []);

    const queryClient = useQueryClient()

    const favoriteyQuery = useQuery({
        queryKey:['favorites'],
        queryFn: ()=> favorites,
        initialData: favorites,
        staleTime: Infinity
    });

    const addFavorite =  useMutation({
        mutationFn: async (city: Omit<FavoriteCities, "id"| "addedAt">)=>{
            const newFavorite : FavoriteCities = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now()
            };

            const exists = favorites.some((fav)=> fav.id === newFavorite.id);
            
            if(exists){
                return favorites;
            }

            const newFavorites = [...favorites, newFavorite].slice(0, 10);
            setFavorites(newFavorites);
            return newFavorites;
        },

        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['favorites']
            });
        }
    });

    const removeFavorites = useMutation({
        mutationFn: async (cityId: string)=>{
            const newFavorites = favorites.filter((city)=> city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },

        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['favorites']
            });
        }
    });

    const isFavorite = (lat: number, lon: number)=>{
        return favorites.some((city)=> city.lat === lat && city.lon === lon);
    }

    return {
        favorites: favoriteyQuery.data,
        addFavorite,
        removeFavorites,
        isFavorite
    };
}
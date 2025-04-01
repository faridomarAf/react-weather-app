import { useFavorite } from "../hooks/use-favorite"
import FavoritecityTablet from "./favorite-city-tablet";
import { ScrollArea } from "./ui/scroll-area";

export default function FavoriteCities() {
    const {favorites, removeFavorites} = useFavorite();

    if(favorites.length === 0){
        return null;
    };

    return (
        <>
            <h1 className="text-xl font-bold tracking-tight">Favrites</h1>
            <ScrollArea className="w-full pb-4">
                <div className="flex gap-4">
                    {favorites.map((city)=>{
                        return <FavoritecityTablet 
                        key={city.id} 
                        {...city}
                        onRemove={()=> removeFavorites.mutate(city.id)}
                        />
                    })}
                </div>
            </ScrollArea>
        </>
    )
}

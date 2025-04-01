import { Star } from "lucide-react";
import { useFavorite } from "../hooks/use-favorite"
import type { WeatherData } from "../types/types"
import { Button } from "./ui/button";
import { toast } from "sonner";

interface FavoriteButtonProps {
    data: WeatherData
}

export default function FavoriteButton({data}: FavoriteButtonProps) {
    const {addFavorite, removeFavorites, isFavorite} = useFavorite();

    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = ()=>{
        if(isCurrentlyFavorite){
            removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        }else{
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success(`Added ${data.name} to Favorites`);
        }
        
    };

    return (
        <Button 
        variant={`${isCurrentlyFavorite ? 'default': 'outline'}`}
        size={'icon'}
        className={isCurrentlyFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        onClick={handleToggleFavorite}
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavorite ? 'fill-current': ''}`}/>
        </Button>
    )
};

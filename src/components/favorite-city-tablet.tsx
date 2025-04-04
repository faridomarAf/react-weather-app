import { useNavigate } from "react-router-dom";
import { FavoritecityTabletProps } from "../types/types";
import { useWeatherQuery } from "../hooks/use-weather";
import { Button } from "./ui/button";
import { Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";


export default function FavoritecityTablet({id, lat, lon, name, onRemove}: FavoritecityTabletProps) {
    const navigate = useNavigate();
    const {data: weather, isLoading} = useWeatherQuery({lat, lon});
    return (
        <div
        onClick={()=> navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role="button"
        tabIndex={0}
        className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
        >
            <Button
            variant={'ghost'} 
            size={'icon'}
            className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive group-hover:opacity-0"
            onClick={(e)=> {
                e.stopPropagation();
                onRemove(id);
                toast.error(`Removed ${name} from Favorites`)
            }}
            >
                <XIcon className="h-4 w-4"/>
            </Button>
            {isLoading ? (
                <div className="flex h-8 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
            ): weather ? ( 
            <>
            <div className="flex items-center gap-2">
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    className="h-full w-full object-contain"
                />
                <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
                </div>
            </div>
            <div className="ml-auto text-right">
                <p className="text-xl font-bold">
                    {Math.round(weather.main.temp)}°
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                    {weather.weather[0].description}
                </p>
            </div>
            </> 
            ) : null}
        </div>
    )
}

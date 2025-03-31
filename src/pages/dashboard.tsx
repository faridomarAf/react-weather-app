import { Button } from '../components/ui/button'
import { RefreshCcw } from 'lucide-react';
import useGeolocation from '../hooks/user-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import AlertError from '../components/alert-error';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '../hooks/use-weather';
import CurrentWeather from '../components/current-weather';

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading:locationIsLoading, getLocation} = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    
    console.log(weatherQuery.data);
    

    const handleRefresh = ()=>{
        getLocation();
        if(coordinates){
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        } 
    };

    if(locationIsLoading || weatherQuery.data === undefined){
        return <WeatherSkeleton/>
    }

    if(locationError){
        return <AlertError 
        locationError={locationError} 
        onClick={getLocation} 
        coordinates={coordinates}
        errorMessage='Error'
        />
    }

    const locationName = locationQuery.data?.[0];

    if(weatherQuery.error || forecastQuery.error){
        return <AlertError
        locationError={'Failed to fetch weather data. Please try again'} 
        onClick={handleRefresh} 
        coordinates={coordinates}
        errorMessage='Error'
        />
    }

    if(weatherQuery.error || forecastQuery.error || !weatherQuery.data){
        return <WeatherSkeleton/>
    }


    return (
        <div className='space-y-4'>
            {/* Favorite cities */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold  tracking-tight'>My location</h1>
                <Button 
                variant={'outline'}
                onClick={handleRefresh}
                disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCcw className={`h-4 w-4 cursor-pointer ${weatherQuery.isFetching? "animate-spin" : ""}`}/>
                </Button>
            </div>
            {/* Current and hourly weather */}
            <div className='grid gap-6'>
                <div>
                    <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
                </div>
            </div>
        </div>
    )
}

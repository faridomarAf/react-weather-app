import { Button } from '../components/ui/button'
import { RefreshCcw } from 'lucide-react';
import useGeolocation from '../hooks/user-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import AlertError from '../components/alert-error';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '../hooks/use-weather';
import CurrentWeather from '../components/current-weather';
import HourlyTemperature from '../components/hourly-temperature';
import WeatherDetails from '../components/weather-details';
import WeatherForecast from '../components/weather-forecast';

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading:locationIsLoading, getLocation} = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    
    const handleRefresh = ()=>{
        getLocation();
        if(coordinates){
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        } 
    };

    if(locationIsLoading){
        return <WeatherSkeleton/>
    }

    if(locationError){
        return <AlertError 
        errorMessage={locationError} 
        onClick={getLocation} 
        title='Location Error'
        useForLocationError= {true}
        />
    }

    if(!coordinates){
        return <AlertError 
        errorMessage='Please enable location access to see your local weather'
        onClick={getLocation} 
        title='Location Required'
        useForCoordinates = {true}
        />
    }

    const locationName = locationQuery.data?.[0];

    if(weatherQuery.error || forecastQuery.error){
        return <AlertError
        errorMessage='Failed to fetch weather data. Please try again' 
        onClick={handleRefresh} 
        title='Error'
        />
    }

    if(!weatherQuery.data || !forecastQuery.data){
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
                <div className='flex flex-col lg:flex-row gap-4'>
                    <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
                    <HourlyTemperature data={forecastQuery.data}/>
                </div>
                <div className='grid gap-6 md:grid-cols-2 items-start'>
                    <WeatherDetails data={weatherQuery.data}/>
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    )
}

import { useParams, useSearchParams } from 'react-router-dom'
import { useForecastQuery, useWeatherQuery } from '../hooks/use-weather';
import AlertError from '../components/alert-error';
import WeatherSkeleton from '../components/loading-skeleton';
import CurrentWeather from '../components/current-weather';
import HourlyTemperature from '../components/hourly-temperature';
import WeatherDetails from '../components/weather-details';
import WeatherForecast from '../components/weather-forecast';
import FavoriteButton from '../components/favorite-button';

export default function City() {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    const coordinates = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if(weatherQuery.error || forecastQuery.error){
        return <AlertError
        errorMessage='Failed to fetch weather data. Please try again' 
        title='Error'
        />
    }

    if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
        return <WeatherSkeleton/>
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold tracking-tight'>{params.cityName},{weatherQuery.data.sys.country}</h1>
                <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
            </div>
            <div className='grid gap-6'>
                <div className='flex flex-col gap-4'>
                    <CurrentWeather data={weatherQuery.data}/>
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

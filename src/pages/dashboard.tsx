import { Button } from '../components/ui/button'
import { RefreshCcw } from 'lucide-react';
import useGeolocation from '../hooks/user-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import AlertError from '../components/alert-error';

export default function Dashboard() {
    const {coordinates, error: locationError, isLoading:locationIsLoading, getLocation} = useGeolocation();
    console.log(coordinates);

    const handleRefresh = ()=>{
        getLocation();
        if(coordinates){
            //reload weather-data
        }
    };

    if(locationIsLoading){
        return <WeatherSkeleton/>
    }

    if(locationError){
        return <AlertError locationError={locationError} onClick={getLocation} coordinates={coordinates}/>
    }


    return (
        <div className='space-y-4'>
            {/* Favorite cities */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold  tracking-tight'>My location</h1>
                <Button 
                variant={'outline'}
                onClick={handleRefresh}
                //disabled={}
                >
                    <RefreshCcw className='h-4 w-4 cursor-pointer'/>
                </Button>
            </div>
            {/* Current and hourly weather */}

        </div>
    )
}

import { useParams, useSearchParams } from 'react-router-dom'
import { useForecastQuery, useWeatherQuery } from '../hooks/use-weather';

export default function City() {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    const coordinates = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);


    return (
        <div>City</div>
    )
}

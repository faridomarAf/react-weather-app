import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../types/types";
import { weatherAPI } from "../api/weather";

export const WEATHER_KEYS ={
    weather: (coords: Coordinates)=> ['weather', coords] as const,
    forecast: (coords: Coordinates)=> ['forecast', coords] as const,
    location: (coords: Coordinates)=> ['location', coords] as const,
    search: (query: string)=> ['location-search', query] as const,
} as const;

export const useWeatherQuery = (coordinates: Coordinates | null)=>{
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat:0, lon: 0}),
        //invoke the api
        queryFn: ()=> coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates// it would be only enable if coordinates present;
    });
};

export const useForecastQuery = (coordinates: Coordinates | null)=>{
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat:0, lon: 0}),
        //invoke the api
        queryFn: ()=> coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates// it would be only enable if coordinates present;
    });
};

export const useReverseGeocodeQuery = (coordinates: Coordinates | null)=>{
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat:0, lon: 0}),
        //invoke the api
        queryFn: ()=> coordinates ? weatherAPI.reverseGeoCode(coordinates) : null,
        enabled: !!coordinates// it would be only enable if coordinates present;
    });
};

export const useLocationSearch = (query: string)=>{
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: ()=> weatherAPI.searchLocations(query),
        enabled: query.length >= 3
    }); 
}
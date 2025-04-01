
export interface Coordinates {
    lat: number;
    lon: number
};

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string
};

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main:{
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind:{
        speed: number;
        deg: number;
    };
    sys:{
        sunrise: number;
        sunset: number;
        country: string;
    };
    name: string;
    dt: number;
};

export interface ForecastData{
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherData['weather'];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>;
    city:{
        name: string;
        country: string;
        sunrise: string;
        sunset: string;
    }
}

export interface GeocodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string
};

export interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
};

export interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

export interface SearchHistoryItem {
    id:string;
    query:string;
    lat:number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
};

export interface FavoriteCities {
    id:string;
    name: string;
    lat:number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
};

export interface FavoritecityTabletProps {
    id:string;
    name: string;
    lat:number;
    lon: number;
    onRemove: (id: string)=> void;
}
# Weather Application

## Overview
This is a multi-page weather application that allows users to view the weather of their favorite locations, including:
- **Dashboard**: Displays favorite locations, current-location temperature, and forecast.
- **Cities Page**: Shows weather details for a selected city.
- **Routing**: Implemented using `react-router-dom`.
- **UI Components**: Built with `shadcn/ui`.

## Tech Stack
- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query** for state management
- **Recharts** for data visualization
- **OpenWeather API** for fetching weather data

## Installation
1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Setup Tailwind CSS**:
   ```sh
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. **Install shadcn/ui**:
   ```sh
   npx shadcn@latest add button alert card command scroll-area skeleton sonner
   ```
4. **Install TanStack Query**:
   ```sh
   npm install @tanstack/react-query @tanstack/react-query-devtools
   ```
5. **Install additional dependencies**:
   ```sh
   npm install recharts date-fns
   ```
6. **Setup OpenWeather API**:
   - Sign up at [OpenWeather](https://openweathermap.org/)
   - Generate an API key
   - Add it to `.env` file:
     ```sh
     REACT_APP_WEATHER_API_KEY=your_api_key_here
     ```

## Project Structure
```
weather-app/
├── src/
│   ├── api/           # API configurations
│   ├── components/    # UI components
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Page components
│   ├── styles/        # Styles and themes
│   ├── App.tsx        # Main application
│   ├── main.tsx       # Entry point
│   ├── config.ts      # App configurations
│   ├── routes.tsx     # Application routing
│   ├── index.css      # Global styles
│   └── types/         # TypeScript types
├── public/
│   ├── assets/        # Static assets
│   ├── favicon.ico    # Favicon
│   ├── index.html     # Main HTML template
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
├── tailwind.config.js # Tailwind configuration
└── README.md          # Project documentation
```

## Features
### 1. **Layout Setup**
- Created a global layout with a header and footer.
- Implemented dark mode support.

### 2. **State Management with TanStack Query**
- Configured `QueryClientProvider` for managing API calls.
- Added `ReactQueryDevtools` for debugging.

### 3. **Weather Data Fetching**
- Utilizes OpenWeather API for current weather and forecasts.
- Implements Geocoding API for location-based weather retrieval.

### 4. **Fetching Current Location Weather**
- Implemented a custom hook `use-geolocation.tsx`.
- Displays real-time weather updates in the dashboard.

### 5. **Fetching City Weather Data**
- Created `use-weather.ts` custom hook.
- Retrieves weather data using latitude and longitude.

### 6. **Weather Data Visualization**
- Integrated `Recharts` for graphical representation of weather trends.
- Uses `date-fns` for date formatting.

### 7. **City Search and Navigation**
- Implemented search functionality in the navbar.
- Fetches city coordinates using OpenWeather’s Geocoding API.
- Redirects to the city-specific page upon selection.

### 8. **Favorites Feature**
- Allows users to mark favorite cities.
- Custom hook `use-favorite.ts` handles favorite locations.
- Displays favorite cities in the dashboard.
- Shows favorite cities as search suggestions.

## Running the Application
To start the development server, run:
```sh
npm run dev
```
To build for production:
```sh
npm run build
```
To preview the production build:
```sh
npm run preview
```

## License
This project is licensed under the MIT License.


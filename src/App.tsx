import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastSection from "./components/ForecastSection";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("bangalore");

  const handleCitySearch = (city: string) => {
    setCurrentCity(city);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-app-gradient-start to-app-gradient-end p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <SearchBar onSearch={handleCitySearch} />
        <WeatherCard cityName={currentCity} />
        <ForecastSection cityName={currentCity} />
      </div>
    </main>
  );
}

export default App;

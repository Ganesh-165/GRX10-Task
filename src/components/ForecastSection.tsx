import React, { useEffect, useState } from "react";
import {
  ForecastItem,
  ForecastSectionProps,
  FutureForecast,
} from "../types/WeatherCard";
import axios from "axios";
import { getWeatherCondition, getWeatherImage } from "../utils/WeatherCard";

const ForecastSection: React.FC<ForecastSectionProps> = ({ cityName }) => {
  const [futureForecast, setFutureForecast] = useState<FutureForecast[]>([]);
  const [isDataPresent, setIsDataPresent] = useState<boolean>(true);

  useEffect(() => {
    fetchFutureForecast();
  }, [cityName]);

  const fetchFutureForecast = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${cityName}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const forecastList = response.data.list;
      const today = new Date().toISOString().split("T")[0];
      const processedDays = new Set();
      const upcomingForecast: FutureForecast[] = [];
      for (const item of forecastList) {
        const forecastDate = item.dt_txt.split(" ")[0];
        if (!processedDays.has(forecastDate) && forecastDate !== today) {
          const dailyForecasts = forecastList.filter((entry: ForecastItem) =>
            entry.dt_txt.startsWith(forecastDate)
          );
          const conditionCounts = dailyForecasts.reduce(
            (counts: Record<string, number>, entry: ForecastItem) => {
              const condition = entry.weather[0].main;
              counts[condition] = (counts[condition] || 0) + 1;
              return counts;
            },
            {} as Record<string, number>
          );
          const mostFrequentCondition = Object.keys(conditionCounts).reduce(
            (a, b) => (conditionCounts[a] > conditionCounts[b] ? a : b)
          );
          const avgTemp =
            dailyForecasts.reduce(
              (sum: number, item: ForecastItem) => sum + item.main.temp,
              0
            ) / dailyForecasts.length;
          const condition = getWeatherCondition(mostFrequentCondition);

          upcomingForecast.push({
            date: new Date(forecastDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }),
            temp: avgTemp,
            imagSrc: getWeatherImage(condition),
            condition: condition,
          });
          processedDays.add(forecastDate);
          if (upcomingForecast.length >= 3) break;
        }
      }
      setIsDataPresent(true);
      setFutureForecast(upcomingForecast);
    } catch (error) {
      setIsDataPresent(false);
      console.error("Error fetching future forecast:", error);
    }
  };

  return (
    <React.Fragment>
      {isDataPresent && (
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-white mb-3">
            Future Forecast
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {futureForecast.map((forecast, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-card rounded-card p-4 shadow-card animate-fade-in"
              >
                <div className="text-lg text-text-primary font-medium">
                  {forecast.condition}
                </div>

                <img
                  src={forecast.imagSrc}
                  className="absolute right-10 top-4 mb-7 w-20 h-20"
                  alt={forecast.condition}
                />

                <div className="flex items-center justify-between my-3 mt-10">
                  <div className="text-temp-small font-semibold text-text-primary">
                    {forecast.temp.toFixed()}° c
                  </div>
                </div>

                <div className="text-text-secondary">{forecast.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ForecastSection;

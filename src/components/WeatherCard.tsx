import {
  ForecastItem,
  WeatherCardProps,
  WeatherData,
} from "../types/WeatherCard";
import real_feel from "../assets/thermometer.svg";
import humidity_img from "../assets/humidity.svg";
import wind_img from "../assets/solarwind.svg";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getWeatherCondition, getWeatherImage } from "../utils/WeatherCard";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import NoData from "./NoData";

const WeatherCard: React.FC<WeatherCardProps> = ({ cityName }) => {
  const initialData: WeatherData = {
    city: cityName,
    highTemperature: 0,
    lowTemperature: 0,
    avgTemperature: 0,
    sunrise: new Date(),
    sunset: new Date(),
    condition: "",
    wind: 0,
    humidity: 0,
    realFeel: 0,
    timestamp: 0,
    date: new Date(),
  };
  const [weatherData, setWeatherData] = useState<WeatherData>(initialData);
  const [isDataPresent, setIsDataPresent] = useState<boolean>(true);
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${cityName}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const city = response.data.city.name;
        const forecastList = response.data.list;
        const today = new Date().toISOString().split("T")[0];
        const todayForecasts = forecastList.filter((item: ForecastItem) =>
          item.dt_txt.startsWith(today)
        );
        if (todayForecasts.length === 0) {
          console.warn("No weather data available for today.");
          return;
        }
        const highTemperature = Math.max(
          ...todayForecasts.map((item: ForecastItem) => item.main.temp_max)
        );
        const lowTemperature = Math.min(
          ...todayForecasts.map((item: ForecastItem) => item.main.temp_min)
        );
        const avgTemperature =
          todayForecasts.reduce(
            (sum: number, item: ForecastItem) => sum + item.main.temp,
            0
          ) / todayForecasts.length;
        const weatherCounts = todayForecasts.reduce(
          (counts: Record<string, number>, item: ForecastItem) => {
            const condition = item.weather[0].main;
            counts[condition] = (counts[condition] || 0) + 1;
            return counts;
          },
          {} as Record<string, number>
        );

        const mostFrequentCondition = Object.keys(weatherCounts).reduce(
          (a, b) => (weatherCounts[a] > weatherCounts[b] ? a : b)
        );
        const currentForecast = todayForecasts[0];
        const next24Hours = forecastList
          .slice(0, 4)
          .map((item: ForecastItem) => ({
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temperature: item.main.temp,
          }));
        setIsDataPresent(true);
        setForecastData(next24Hours);
        setWeatherData({
          city,
          highTemperature,
          lowTemperature,
          avgTemperature,
          sunrise: new Date(response.data.city.sunrise * 1000),
          sunset: new Date(response.data.city.sunset * 1000),
          condition: getWeatherCondition(mostFrequentCondition),
          wind: currentForecast?.wind.speed || 0,
          humidity: currentForecast?.main.humidity || 0,
          realFeel: currentForecast?.main.feels_like || 0,
          timestamp: currentForecast?.dt || 0,
          date: new Date(currentForecast?.dt * 1000 || Date.now()),
        });
      } catch (error) {
        setIsDataPresent(false);
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [cityName]);

  const {
    city,
    highTemperature,
    lowTemperature,
    avgTemperature,
    realFeel,
    humidity,
    wind,
    sunrise,
    sunset,
    date,
    condition,
    timestamp,
  } = weatherData;

  const imageSrc: string = getWeatherImage(condition);

  return (
    <React.Fragment>
      {isDataPresent ? (
        <div className=" flex gap-5 flex-col sm:flex-row ">
          <div className="bg-white backdrop-blur-card rounded-card p-4 shadow-card animate-fade-in w-full">
            <h2 className="text-3xl font-medium text-app-blue mb-8 ml-4">
              {city}
            </h2>
            <div className="flex justify-evenly items-center mb-6">
              <div className="flex flex-col">
                <div>
                  <img className="w-28 h-28" src={imageSrc}></img>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <span className="flex items-center opacity-40">
                    <img src={real_feel} className=" w-5 h-5"></img>Real Feel
                  </span>
                  <span className="flex items-center opacity-40">
                    <img src={humidity_img} className=" w-5 h-5"></img>Humidity
                  </span>
                  <span className="flex items-center opacity-40">
                    <img src={wind_img} className=" w-7 h-5"></img>Wind
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="">{realFeel}°c</span>
                  <span className="">{humidity}%</span>
                  <span className="">{wind} km/h</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-10 items-center">
              <div className="flex flex-col">
                <div className="text-temp-large font-semibold">
                  {avgTemperature.toFixed()} °
                  <span className="text-sm align-text-top">c</span>
                </div>
                <div className="text-xl font-bold">{condition}</div>
              </div>
              <div className="text-md flex flex-col">
                <div>
                  Rise:{" "}
                  {sunrise.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  Set:{" "}
                  {sunset.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-card p-4 shadow-card animate-fade-in w-full">
            <div className="flex w-full justify-center gap-10 p-6 items-center">
              <div className="mb-2">
                <div className="text-2xl font-bold">
                  {date.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
                <div className="text-md opacity-70">
                  {date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="text-md opacity-70">
                  {new Date(timestamp * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>

              <div className="flex justify-between mb-4 flex-col">
                <div className=" flex gap-2">
                  <div className="text-text-secondary text-md opacity-70">
                    High
                  </div>
                  <div className="">{highTemperature}°c</div>
                </div>
                <div className=" flex gap-2">
                  <div className="text-text-secondary text-md opacity-70">
                    Low
                  </div>
                  <div className="text-text-primary">{lowTemperature}°c</div>
                </div>
              </div>
            </div>
            <div className="px-10 mb-6">
              <div className="bg-chart-bg relative h-20 p-5 rounded-md">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8884d8"
                      strokeWidth={2}
                    >
                      <LabelList
                        dataKey="temperature"
                        position="bottom"
                        fontSize={12}
                        fill="#555"
                      />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="text-center">24-Hour Forecast</div>
          </div>
        </div>
      ) : (
        <NoData city={cityName} />
      )}
    </React.Fragment>
  );
};

export default WeatherCard;

import rainy_src from "../assets/rainy.svg";
import cloudy_src from "../assets/drizzle.svg";
import sunny_src from "../assets/sunny.svg";

export const getWeatherImage = (condition: string) => {
  switch (condition) {
    case "Sunny":
      return sunny_src;
    case "Rainy":
      return rainy_src;
    default:
      return cloudy_src;
  }
};

export const getWeatherCondition = (condition: string): string => {
  if (condition === "Clear") return "Sunny";
  if (["Rain", "Drizzle", "Thunderstorm"].includes(condition)) return "Rainy";
  return "Cloudy";
};

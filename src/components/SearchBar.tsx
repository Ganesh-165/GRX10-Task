import React, { useState, useEffect } from "react";
import src from "../assets/search.svg";
import axios from "axios";
import { City, SearchBarProps } from "../types/SearchBar";
import { useOutsideClick } from "../hooks/useClickOutside";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const searchRef = useOutsideClick<HTMLDivElement>(() => {
    setShowSuggestions(false);
  });

  const searchCities = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setCities([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: searchQuery,
            limit: 10,
            appid: "19bda7ae4043499144b85493916dae95",
          },
        }
      );

      const cityResults = response.data.map((city: any, index: number) => ({
        id: `${city.lat}-${city.lon}-${index}`,
        name: city.name,
        country: city.country,
        state: city.state || "",
        lat: city.lat,
        lon: city.lon,
      }));

      setCities(cityResults);
      setShowSuggestions(cityResults.length > 0);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        searchCities(query);
      } else {
        setCities([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: City) => {
    setQuery(city.name);
    onSearch(city.name);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="w-full mb-4 animate-fade-in relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
            <img src={src} alt="Search Icon" />
          </div>
          <input
            type="text"
            className="block w-full bg-white pl-16 pr-3 h-16 rounded-input shadow-input text-text-primary placeholder-text-secondary focus:outline-none"
            placeholder="Search or Enter City Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            onFocus={() =>
              query && cities.length > 0 && setShowSuggestions(true)
            }
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </form>

      {showSuggestions && cities.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {cities.map((city) => (
              <li
                key={city.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleCitySelect(city)}
              >
                <div>
                  <div className="text-text-primary">{city.name}</div>
                  <div className="text-text-secondary text-sm">
                    {city.state && `${city.state}, `} {city.country}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

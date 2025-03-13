export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface City {
  id: string;
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

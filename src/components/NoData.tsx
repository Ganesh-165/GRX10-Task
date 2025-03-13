import { CloudOff } from "lucide-react";
import { NoDataProps } from "../types/NoData";

const NoData: React.FC<NoDataProps> = ({ city }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 p-6 rounded-xl shadow-lg">
      <CloudOff className="w-12 h-12 text-gray-800" />
      <h2 className="text-xl font-semibold text-gray-700 mt-2">
        No data found
      </h2>
      <p className="text-gray-500">
        We couldn't find weather data for{" "}
        <span className="font-bold">{city}</span>.
      </p>
    </div>
  );
};

export default NoData;

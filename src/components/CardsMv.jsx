import { Link } from "react-router-dom";

export const CardsMv = ({ title, img, overview, popularity, rating }) => {
  try {
    return (
      <div className="relative w-40 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        </div>

        {/* Rating section - now positioned and styled properly */}
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
          <span>{rating.toFixed(1)}</span>
        </div>

        {/* Movie Image */}
        <img
          className="w-full object-cover h-56"
          src={img}
          alt={title}
        />

        {/* Movie Title */}
        <div className="p-3">
          <h2 className="text-center text-sm">{title}</h2>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

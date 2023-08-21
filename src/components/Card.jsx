/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from "react-router-dom";
const Card = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className="rounded-md bg-slate-700 flex flex-col hover:scale-125 transition-all duration-300 hover:z-10 cursor-pointer"
      onClick={() => {
        if (location.pathname.slice(1, 3) === "tv") {
          navigate(`/tv/${item.id}`);
        } else {
          navigate(`/movie/${item.id}`);
        }
      }}
    >
      <div className=" max-w-full aspect-video overflow-hidden">
        <img
          src={
            item.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
              : item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://waterfieldtech.com/wp-content/uploads/2019/02/placeholder-image-gray-3x2.png"
          }
        />
      </div>
      <div className=" font-mono text-sm md:text-base truncate text-center p-1">
        {item.title || item.name}
      </div>
    </div>
  );
};

export default Card;

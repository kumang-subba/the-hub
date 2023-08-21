import useMovie from "../hooks/useMovie";
import { PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VideoCarousel from "./VideoCarousel";

const Billboard = () => {
  const { homePageMain, movieGenres, popularMovies, fetchModel } = useMovie();
  const [imageLoad, setImageLoad] = useState(false);
  const navigate = useNavigate();
  const genreNames =
    homePageMain &&
    movieGenres &&
    movieGenres.reduce((acc, cur) => {
      if (homePageMain.genre_ids.includes(cur.id)) {
        acc.push(cur.name);
      }
      return acc;
    }, []);
  return (
    <div className="relative">
      {homePageMain && (
        <>
          <div className="max-w-full relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${homePageMain.backdrop_path}`}
              width={"100%"}
              className={`${imageLoad ? "block" : "hidden"}`}
              onLoad={() => setImageLoad(true)}
            />
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-transparent to-slate-800 "></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-slate-900 "></div>
          </div>

          <div className=" absolute bottom-1/3 left-6 md:left-12 max-w-lg flex flex-col">
            <div className="text-2xl font-black text-shadow-big shadow-black mb-3 font-serif md:text-4xl">
              {homePageMain.title}
            </div>
            <div className="flex gap-1">
              <button
                className=" rounded-l-lg text-black bg-white w-20 h-8 md:w-28 md:h-12 md:font-bold font-medium font-mono md:pr-0 pr-1  flex items-center justify-center transition-all hover:bg-black hover:opacity-90 hover:text-gray-400 ease-out"
                onClick={() =>
                  fetchModel(homePageMain.id, "movie", homePageMain.title)
                }
              >
                <PlayIcon className=" w-7" />
                Trailer
              </button>
              <button
                className=" rounded-r-lg bg-gray-700 w-20 h-8 md:w-28 md:h-12 md:font-bold font-medium md:pr-0 pr-1 font-mono flex items-center justify-center gap-1 transition-all hover:bg-black hover:opacity-90 hover:text-gray-400 ease-out"
                onClick={() => navigate(`/movie/${homePageMain.id}`)}
              >
                <InformationCircleIcon className="w-7" />
                Details
              </button>
            </div>
            <div className="flex flex-wrap gap-2 py-4 max-w-xs">
              {genreNames.map((genre, index) => (
                <div
                  key={index}
                  className=" text-sm rounded-2xl bg-gray-600 py-1 px-2 text-white font-semibold font-mono"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div
        className={`h-screen flex items-center justify-center animate-pulse  ${
          !imageLoad ? "block" : "hidden"
        }`}
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
      </div>
      <div className="text-white font-extrabold text-xl absolute bottom-[25%] left-6 md:left-12 text-shadow-md shadow-black">
        Popular Movies
      </div>
      <div className=" absolute bottom-[2%] md:bottom-[5%]">
        {popularMovies && <VideoCarousel videos={popularMovies} type="movie" />}
      </div>
    </div>
  );
};

export default Billboard;

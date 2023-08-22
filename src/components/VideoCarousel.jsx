/* eslint-disable react/prop-types */
import { PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useMovie from "../hooks/useMovie";
import { useState, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

const VideoCarousel = ({ videos, type }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const { movieGenres, fetchModel, tvGenres } = useMovie();
  const [slideDir, setSlideDir] = useState("right");
  const matches = useMediaQuery("(min-width: 768px)");
  const slide = useRef();
  const navigate = useNavigate();
  const handleSlider = (dir) => {
    slide.current.style.transition = "all 500ms";
    if (dir === "right") {
      setSlideDir("right");
      slide.current.style.transform = `translate3d(-100%,0,0)`;
      if (mainIndex >= 1) {
        slide.current.style.transform = `translate3d(-200%,0,0)`;
      }
      setSliderIndex((prev) => prev + 1);
      setMainIndex((prev) => prev + 1);
    } else {
      setSlideDir("left");
      if (mainIndex >= 1) {
        slide.current.style.transform = `translate3d(0%,0,0)`;
      } else {
        slide.current.style.transform = `translate3d(-100%,0,0)`;
      }

      setSliderIndex((prev) => prev - 1);
      setMainIndex((prev) => prev - 1);
    }
  };
  const progress = matches ? [...Array(4)] : [...Array(5)];
  const [progressVisible, setProgressVisible] = useState(false);
  return (
    <div
      className="relative flex justify-center overflow-x-clip h-auto"
      onMouseEnter={() => setProgressVisible(true)}
      onMouseLeave={() => setProgressVisible(false)}
    >
      <div className="flex absolute  gap-1 -top-8 right-8">
        {progress.map((item, index) => {
          return (
            <div
              className={` w-6 h-3 shadow-sm shadow-black rounded-sm  ${
                mainIndex % progress.length == index
                  ? "bg-slate-200"
                  : "bg-gray-600"
              } ${progressVisible ? "visible" : "hidden"}`}
              key={index}
            ></div>
          );
        })}
      </div>
      <div
        className={`cursor-pointer z-10 text-7xl flex justify-center items-center px-0 md:px-3 backdrop-opacity-50 backdrop-contrast-50 opacity-0 hover:opacity-100 hover:animate-pulse ${
          mainIndex == 0 && "invisible"
        }`}
        onClick={() => handleSlider("left")}
      >
        &#8249;
      </div>
      <div
        className={`flex grow [--items-per-screen:4] md:[--items-per-screen:5] transition-all`}
        ref={slide}
        onTransitionEnd={() => {
          if (sliderIndex > 1 && slideDir === "right") {
            slide.current.appendChild(slide.current.firstChild);
            slide.current.appendChild(slide.current.firstChild);
            slide.current.appendChild(slide.current.firstChild);
            slide.current.appendChild(slide.current.firstChild);
            matches && slide.current.appendChild(slide.current.firstChild);
            slide.current.style.transition = "none";
            setSliderIndex((prev) => prev - 1);
            slide.current.style.transform = `translate3d(-100%,0,0)`;
            setTimeout(() => {
              slide.current.style.transition = "all 250ms";
            });
          } else if (sliderIndex !== mainIndex) {
            slide.current.prepend(slide.current.lastElementChild);
            slide.current.prepend(slide.current.lastElementChild);
            slide.current.prepend(slide.current.lastElementChild);
            slide.current.prepend(slide.current.lastElementChild);
            matches && slide.current.prepend(slide.current.lastElementChild);
            slide.current.style.transition = "none";
            slide.current.style.transform = `translate3d(-100%,0,0)`;
            setTimeout(() => {
              slide.current.style.transition = "all 250ms";
            });
            setSliderIndex((prev) => prev + 1);
          }
        }}
      >
        {videos?.map((item) => {
          const genre = type == "movie" ? movieGenres : tvGenres;
          const itemGenre = genre.reduce((acc, curr) => {
            if (item.genre_ids.includes(curr.id) && acc.length < 3) {
              acc.push(curr.name);
            }
            return acc;
          }, []);
          return (
            <div
              key={item.id}
              className="flex-[0_0_calc(100%/var(--items-per-screen))] group hover:scale-125 hover:rounded-lg transition-transform group duration-500 relative hover:z-40 pr-2 hover:-translate-y-1/4"
              onTransitionEnd={(e) => e.stopPropagation()}
            >
              <img
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/w400${item.backdrop_path}`
                    : "https://waterfieldtech.com/wp-content/uploads/2019/02/placeholder-image-gray-3x2.png"
                }
                alt=""
                className=" aspect-video group-hover:-translate-y-5 group-hover:rounded-t-lg"
              />
              <div className="invisble hidden group-hover:visible group-hover:block absolute bg-slate-800 w-[97.5%] top-[80%] px-4 py-2">
                <div className=" font-mono text-sm md:text-base truncate">
                  {item.title || item.name}
                </div>
                <div className="flex gap-1">
                  <div
                    className="rounded-full p-1 my-1 bg-white text-black flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      fetchModel(item.id, type, item.title || item.name)
                    }
                  >
                    <PlayIcon className="w-5 rounded-full bg-white text-black" />
                  </div>
                  <InformationCircleIcon
                    className="w-7 cursor-pointer"
                    onClick={() => navigate(`/${type}/${item.id}`)}
                  />
                  <div className="grow flex items-center justify-end font-mono text-xs ">
                    Rating:{item.vote_average}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {itemGenre.map((genre, index) => (
                    <div key={index} className="font-mono text-xs">
                      {genre}
                      {index + 1 < itemGenre.length && "·"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`cursor-pointer z-10 text-7xl flex justify-center items-center px-3 backdrop-opacity-50 backdrop-contrast-50 opacity-0 hover:opacity-100 hover:animate-pulse`}
        onClick={() => handleSlider("right")}
      >
        &#8250;
      </div>
    </div>
  );
};

export default VideoCarousel;

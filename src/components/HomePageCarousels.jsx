import useMovie from "../hooks/useMovie";
import VideoCarousel from "./VideoCarousel";

const HomePageCarousels = () => {
  const { popularTvShows, trendingMovies } = useMovie();
  return (
    <div className=" pt-5 pb-32 flex flex-col gap-5">
      <div className="text-white font-extrabold text-xl text-shadow-md shadow-black px-6 md:px-12 py-5">
        Popular Tv Series
      </div>
      <VideoCarousel videos={popularTvShows} type="tv" />
      <div className="text-white font-extrabold text-xl text-shadow-md shadow-black px-6 md:px-12 py-5">
        Trending Movies
      </div>
      <VideoCarousel videos={trendingMovies} type="movie" />
    </div>
  );
};

export default HomePageCarousels;

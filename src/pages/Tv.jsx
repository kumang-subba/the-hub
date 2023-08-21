import SelectMenu from "../components/SelectMenu";
import Card from "../components/Card";
import useMovie from "../hooks/useMovie";
import { useEffect, useState } from "react";
const Tv = () => {
  const [offset, setOffset] = useState(0);

  const {
    tvGenres,
    fetchTvPage,
    currentPage,
    genreSelect,
    fetchByGenre,
    setGenreSelect,
    setCurrentPage,
  } = useMovie();
  useEffect(() => {
    fetchTvPage();
    return () => {
      setGenreSelect();
      setCurrentPage([]);
    };
  }, []);
  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight =
      e.target.documentElement.scrollTop + window.innerHeight;
    if (currentHeight + 1 >= scrollHeight) {
      setOffset(offset + 5);
      if (genreSelect) {
        fetchByGenre();
      } else {
        fetchTvPage();
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <>
      <>
        <div className="flex items-center gap-5 fixed bg-slate-900 w-full px-6 md:px-12 pb-5 mb-10 z-20 mt-14">
          <div className="text-5xl font-semibold pt-5 font-sans">Tv Shows</div>
          <SelectMenu genres={tvGenres} />
        </div>
        <div className="px-6 pb-6 pt-20 md:px-12 md:pb-12 ">
          <div className="grid grid-cols-3 mt-24 gap-x-5 gap-y-10 md:grid-cols-4">
            {currentPage?.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default Tv;

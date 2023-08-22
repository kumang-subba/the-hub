import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useMovie from "../hooks/useMovie";

/* eslint-disable react/prop-types */
const SelectMenu = ({ genres }) => {
  const { fetchByGenre, genreSelect, setGenreSelect, setPage, setCurrentPage } =
    useMovie();
  const [open, setOpen] = useState(false);
  const selectRef = useRef();
  useEffect(() => {
    function closeSelectMenu(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeSelectMenu);
    return () => document.removeEventListener("mousedown", closeSelectMenu);
  }, [selectRef]);

  return (
    <div className="font-medium text-sm w-32 mt-5 relative" ref={selectRef}>
      <div
        className=" bg-black border border-white px-2 py-1 flex justify-between items-center hover:bg-transparent"
        onClick={() => setOpen(!open)}
      >
        {genreSelect ? genreSelect : "Genres"}
        <ChevronDownIcon className="w-3" />
      </div>
      <div
        className={` bg-black bg-opacity-70 w-[300%] absolute ${
          open ? "block" : "hidden"
        } grid grid-rows-6 grid-flow-col gap-x-3 gap-y-2 p-2`}
      >
        {genres?.map((genre) => (
          <div
            key={genre.id}
            className=" hover:underline cursor-pointer"
            onClick={() => {
              setOpen(false);
              setGenreSelect(genre.name);
              fetchByGenre(genre.id);
              setPage(1);
              setCurrentPage([]);
            }}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMenu;

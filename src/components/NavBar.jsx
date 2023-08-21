import { Link, useLocation, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useEffect } from "react";
import useMovie from "../hooks/useMovie";

const NavBar = () => {
  const { searchQuery, handleSearch } = useMovie();
  const [pinHeader, setHeader] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const loc = useLocation();
  const navigate = useNavigate();
  const toggleSearchBar = () => {
    if (!searchBar) {
      inputRef.current.focus();
    }
    setSearchBar(!searchBar);
  };
  const handleScroll = () => {
    if (window.scrollY === 0) {
      setHeader(false);
    } else if (ref && ref.current && ref.current.getBoundingClientRect()) {
      setHeader(ref.current.getBoundingClientRect().top <= 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full fixed top-0 left-0 px-6 md:px-12 z-20 ${
        pinHeader ? " bg-slate-900" : "bg-transparent"
      } transition-all`}
      ref={ref}
    >
      <div className="flex items-center py-2 justify-between">
        <div className="flex items-center gap-4">
          <img
            src="./images/navbar.png"
            alt="title"
            className="w-36 h-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <Link
            className={`text-xl transition-all ease-linear duration-300 ${
              loc.pathname === "/"
                ? " font-black cursor-default"
                : " font-semibold  hover:text-gray-400 "
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`text-xl transition-all ease-linear duration-300
              ${
                loc.pathname === "/movies"
                  ? " font-black cursor-default"
                  : " font-semibold  hover:text-gray-400 "
              }`}
            to="/movies"
          >
            Movies
          </Link>
          <Link
            className={`text-xl transition-all ease-linear duration-300
              ${
                loc.pathname === "/tv"
                  ? " font-black cursor-default"
                  : " font-semibold  hover:text-gray-400 "
              }`}
            to="tv"
          >
            TV Shows
          </Link>
        </div>
        {!(loc.pathname === "/") && (
          <div>
            <div
              className={`flex p-1 ${
                searchBar && "border-white border bg-black opacity-70 "
              }`}
            >
              <MagnifyingGlassIcon
                className={`h-7 w-7 ${!searchBar && "cursor-pointer"}`}
                onClick={toggleSearchBar}
              />

              <input
                ref={inputRef}
                type="text"
                name="query"
                placeholder="Movies, TV series, People..."
                className={` bg-inherit text-sm outline-none transition-[width] ease-[cubic-bezier(1, 0, 1, 0)] w-0 ${
                  searchBar ? "w-60 duration-300" : "duration-0"
                }`}
                value={searchQuery}
                onChange={handleSearch}
                onBlur={() => setSearchBar(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

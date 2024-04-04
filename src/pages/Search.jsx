import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useMovie from "../hooks/useMovie";
import LoadingBoxes from "../components/LoadingBoxes";
import Card from "../components/Card";

const Search = () => {
  const { searchQuery } = useMovie();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(loc.search);
  const paramValue = queryParams.get("query");
  const url = loc.pathname.slice(1, 3) == "tv" ? "/tv" : "/movies";

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      if (url === "/tv") {
        var res = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${paramValue}&api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
      } else {
        res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${paramValue}&api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
      }
      const data = await res.json();
      setSearchResults(data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let debounce;
    if (searchQuery == "") {
      navigate(url);
    } else {
      debounce = setTimeout(() => {
      fetchSearchResults();
      }, 300);
    }
    return () => clearTimeout(debounce);
  }, [loc]);
  return (
    <>
      <div className="fixed bg-slate-900 w-full px-6 md:px-12 pb-5 mb-10 z-20 mt-14">
        <div className="text-4xl font-semibold pt-5 font-sans">
          Searching {url === "/tv" ? "Tv Series: " : "Movie: "}
          {paramValue}
        </div>
        {loading ? (
          <LoadingBoxes />
        ) : (
          <div>
            <div className="grid grid-cols-3 mt-10 gap-x-5 gap-y-10 md:grid-cols-4">
              {searchResults?.map((item, index) => (
                <Card key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

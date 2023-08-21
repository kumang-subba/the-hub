import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export const MovieContext = createContext({});

// eslint-disable-next-line react/prop-types
export const MovieContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [popularTvShows, setPopularTvShows] = useState();
  const [homePageMain, setHomePageMain] = useState();
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState([]);
  const [genreSelect, setGenreSelect] = useState();
  const [page, setPage] = useState(1);
  const loc = useLocation();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (loc.pathname.slice(-6) !== "search") {
      navigate(`${loc.pathname}/search`);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams((params) => {
        params.delete("query");
        return params;
      });
    }
  }, [searchQuery]);
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };
  const location = useLocation();
  const fetchTvPage = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`
    );
    const data = await res.json();
    setCurrentPage((prev) => [...prev, ...data.results]);
    setPage((prev) => prev + 1);
  };
  const fetchMoviesPage = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`
    );
    const data = await res.json();
    setCurrentPage((prev) => [...prev, ...data.results]);
    setPage((prev) => prev + 1);
  };
  const fetchModel = (id, type, name) => {
    setShowModal(true);
    if (type === "movie") {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setModalData({
            id: data.results.find((item) => item.type == "Trailer").key,
            name: name,
          });
        });
    } else if (type === "tv") {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setModalData({
            id: data?.results[0]?.key || undefined,
            name: name,
          });
        });
    }
  };
  const shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const fetchTrendingMovies = async () => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(shuffle(data.results));
      });
  };
  const fetchHomeMain = async () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = shuffle(data.results);
        setPopularMovies(shuffledData);
        setHomePageMain(shuffledData[shuffledData.length - 1]);
      });
  };
  const fetchPopularTvShows = async () => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setPopularTvShows(shuffle(data.results));
      });
  };
  const fetchGenres = async () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieGenres(data.genres));
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setTvGenres(data.genres));
  };
  const fetchByGenre = async (id) => {
    if (location.pathname.slice(1, 3) === "tv") {
      var res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&sort_by=popularity&page=${page}&with_genres=${id}`
      );
    } else {
      res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&sort_by=popularity&page=${page}&with_genres=${id}`
      );
    }
    const data = await res.json();
    setCurrentPage((prev) => [...prev, ...data.results]);
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    fetchHomeMain();
    fetchGenres();
    fetchPopularTvShows();
    fetchTrendingMovies();
  }, []);
  return (
    <MovieContext.Provider
      value={{
        fetchTvPage,
        homePageMain,
        movieGenres,
        popularMovies,
        popularTvShows,
        trendingMovies,
        showModal,
        fetchModel,
        closeModal,
        modalData,
        fetchMoviesPage,
        currentPage,
        genreSelect,
        setGenreSelect,
        fetchByGenre,
        setCurrentPage,
        setPage,
        tvGenres,
        searchQuery,
        handleSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

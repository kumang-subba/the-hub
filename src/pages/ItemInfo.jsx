import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import useMovie from "../hooks/useMovie";
import Card from "../components/Card";

const ItemInfo = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [cast, setCast] = useState();
  const [similar, setSimilar] = useState();
  const params = useParams();
  const { fetchModel } = useMovie();
  const location = useLocation();
  const url = location.pathname.slice(1, 3);
  const fetchDetails = async () => {
    setLoading(true);
    try {
      if (url === "tv") {
        var res = await fetch(
          `https://api.themoviedb.org/3/tv/${params.id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
      } else {
        res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
      }
      const data = await res.json();
      setInfo(data);
    } finally {
      setLoading(false);
    }
  };
  const fetchCast = async () => {
    if (url === "tv") {
      var res = await fetch(
        `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
    } else {
      res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
    }
    const data = await res.json();
    setCast(data.cast);
  };
  const fetchSimilar = async () => {
    if (url === "tv") {
      var res = await fetch(
        `https://api.themoviedb.org/3/tv/${params.id}/similar?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
    } else {
      res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
    }
    const data = await res.json();
    setSimilar(data.results);
  };
  useEffect(() => {
    fetchDetails();
    fetchCast();
    fetchSimilar();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <div className=" flex justify-center items-center w-full h-[60vh]">
          <svg
            aria-hidden="true"
            className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="p-7 md:p-12">
          <div className=" flex mt-6 gap-5">
            {info?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${info?.poster_path}`}
                className=" max-h-[600px]"
              />
            ) : (
              <div className="flex justify-center items-center rounded-md border-yellow-100 border w-1/4 bg-slate-500 flex-col aspect-[4/5]">
                No Image
                <svg
                  className="w-10 h-10 text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
              </div>
            )}
            <div className="flex flex-col gap-5">
              <div className=" text-2xl font-bold">
                {info?.title || info?.original_name}
              </div>
              <div className="flex flex-wrap gap-2">
                {info?.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="text-xs rounded-2xl bg-gray-600 py-1 px-2 text-white font-medium font-mono"
                  >
                    {genre.name}
                    {index + 1 < genre.length && "·"}
                  </div>
                ))}
              </div>
              <div>{info?.overview}</div>
              {url === "tv" ? (
                <div>
                  <div>
                    First air date:{" "}
                    <span className="font-medium">{info?.first_air_date}</span>
                  </div>
                  {info?.last_air_date && (
                    <div>
                      Last air date:{" "}
                      <span className="font-medium">{info?.last_air_date}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  Release Date:{" "}
                  <span className=" font-medium">{info?.release_date}</span>
                </div>
              )}
              <button
                className=" rounded-lg text-black bg-white w-20 h-8 md:w-28 md:h-12 md:font-bold font-medium font-mono md:pr-0 pr-1  flex items-center justify-center transition-all hover:bg-black hover:opacity-90 hover:text-gray-400 ease-out"
                onClick={() => {
                  const type = url === "tv" ? "tv" : "movie";
                  fetchModel(info?.id, type, info?.title);
                }}
              >
                <PlayIcon className=" w-7" />
                Trailer
              </button>
              {cast?.length > 0 && (
                <>
                  <div>Cast:</div>
                  <div className="flex flex-wrap gap-2">
                    {cast?.map((person, index) => {
                      if (index < 10) {
                        return (
                          <div
                            key={index}
                            className="flex-[0_0_25%] md:flex-[0_0_10%] flex flex-col items-center justify-center"
                          >
                            {person?.profile_path ? (
                              <img
                                className="w-16 object-cover aspect-square rounded-full"
                                src={`https://image.tmdb.org/t/p/w400${person.profile_path}`}
                              />
                            ) : (
                              <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                <svg
                                  className="absolute w-12 h-12 text-gray-400 left-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            )}
                            <div className=" text-xs truncate">
                              {person.name}
                            </div>
                            {person?.character && (
                              <>
                                <div>AS</div>
                                <div className="text-xs truncate">
                                  {person.character}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          {similar?.length > 0 && (
            <>
              <div className=" mt-5 font-semibold text-2xl">
                Similar {url === "tv" ? "TV Shows" : "Movies"}
              </div>
              <div className="grid grid-cols-5 mt-5 gap-x-5 gap-y-10 md:grid-cols-6">
                {similar.map((item, index) => {
                  if (index < 10) {
                    return <Card key={index} item={item} />;
                  }
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ItemInfo;

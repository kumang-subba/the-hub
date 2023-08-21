import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const useMovie = () => {
  return useContext(MovieContext);
};
export default useMovie;

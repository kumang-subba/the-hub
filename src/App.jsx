import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieContextProvider } from "./context/MovieContext";
import ScrollToTop from "./components/ScrollToTop";
import VideoPlayerModal from "./components/VideoPlayerModal";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const ItemInfo = lazy(() => import("./pages/ItemInfo"));
const Tv = lazy(() => import("./pages/Tv"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <MovieContextProvider>
      <div className="bg-slate-900 text-white min-h-screen">
        <ScrollToTop />
        <NavBar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/search" element={<Search />} />
            <Route path="/movie/:id" element={<ItemInfo />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/tv/:id" element={<ItemInfo />} />
            <Route path="/tv/search" element={<Search />} />
          </Routes>
        </Suspense>
        <VideoPlayerModal />
      </div>
    </MovieContextProvider>
  );
}

export default App;

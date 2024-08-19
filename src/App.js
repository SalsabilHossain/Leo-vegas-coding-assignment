import { useEffect, useState, useCallback } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, resetMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import { debounce } from "./utils/debounce";
import "./styles/loader.scss";

const App = () => {
  const movies = useSelector((state) => {
    return state.movies;
  });
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams("");
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSearchResults = async (query) => {
    setLoading(true);
    if (query) {
      setSearchParams(createSearchParams({ search: query }));
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
    } else {
      setSearchParams({});
    }
    setLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      navigate("/");
      getSearchResults(query);
    }, 500),
    [navigate]
  );

  const getMovies = async () => {
    setLoading(true);
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
    setLoading(false);
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, [searchQuery]);

  return (
    <div className="App">
      <Header
        searchMovies={debouncedSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          videoKey && isOpen && <YouTubePlayer videoKey={videoKey} />
        )}
        <Routes>
          <Route
            path="/"
            element={<Movies movies={movies} viewTrailer={viewTrailer} search={searchQuery} />}
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

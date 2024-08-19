import Movie from "./Movie";
import "../styles/movies.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesInfinite } from "./../data/moviesSlice";
import { ENDPOINT_DISCOVER } from "./../constants";

const Movies = ({ viewTrailer, search }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const loadMore = () => {
    dispatch(
      fetchMoviesInfinite({
        apiUrl: ENDPOINT_DISCOVER,
        page: Math.ceil((movies.results?.length || 0) / 20) + 1,
      })
    );
  };

  return (
    <div data-testid="movies" className="movies-container">
      {movies.results?.length > 0 ? (
        movies.results.map((movie) => (
          <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
        ))
      ) : (
        <div className="no-results" data-testid="no-results">
          No matching movies found or the list is empty.
        </div>
      )}
      {movies.results?.length > 0 && (
        <button
          className="btn btn-light btn-show-more"
          onClick={loadMore}
          data-testid="load-more"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Movies;

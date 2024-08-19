import moviesSlice, { fetchMovies, fetchMoviesInfinite } from "../data/moviesSlice";
import { infiniteMoviesMock, moviesMock } from "./movies.mocks";


describe("MovieSlice tests", () => {
  const initialState = {
    movies: [],
    fetchStatus: "",
  };

  it("should set loading true while action is pending", () => {
    const action = fetchMovies.pending.type;
    const newState = moviesSlice.reducer(initialState, { type: action });

    expect(newState.fetchStatus).toBe("loading");
    expect(newState.movies).toEqual([]);
  });

  it("fetch infinite movies when load more is click", () => {
    const action = {
      type: fetchMoviesInfinite.fulfilled.type,
      payload: infiniteMoviesMock,
    };
    const newState = moviesSlice.reducer(initialState, action);
  
    expect(newState.movies).toEqual(infiniteMoviesMock);
    expect(newState.fetchStatus).toBe("success");
  });

  it("should set movies and fetchStatus when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled.type,
      payload: moviesMock,
    };
    const newState = moviesSlice.reducer(initialState, action);

    expect(newState.movies).toEqual(moviesMock);
    expect(newState.fetchStatus).toBe("success");
    
  });

  it("should set error and fetchStatus when action is rejected", () => {
    const action = {
      type: fetchMovies.rejected.type,
      error: { message: "Failed to fetch movies" },
    };
    const newState = moviesSlice.reducer(initialState, action);

    expect(newState.movies).toEqual([]);
    expect(newState.fetchStatus).toBe("error");
  });
});


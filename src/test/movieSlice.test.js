import moviesSlice, { fetchMovies } from "../data/moviesSlice";
import { moviesMock } from "./movies.mocks";
import { configureStore } from "@reduxjs/toolkit";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";

describe("MovieSlice tests", () => {
  const initialState = {
    movies: [],
    fetchStatus: "",
    error: null,
  };

  it("should set loading true while action is pending", () => {
    const action = fetchMovies.pending.type;
    const newState = moviesSlice.reducer(initialState, { type: action });

    expect(newState.fetchStatus).toBe("loading");
    expect(newState.movies).toEqual([]);
    expect(newState.error).toBeNull();
  });

  it("should set movies and fetchStatus when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled.type,
      payload: moviesMock,
    };
    const newState = moviesSlice.reducer(initialState, action);

    expect(newState.movies).toEqual(moviesMock);
    expect(newState.fetchStatus).toBe("success");
    expect(newState.error).toBeNull();
    
  });

  it("should set error and fetchStatus when action is rejected", () => {
    const action = {
      type: fetchMovies.rejected.type,
      error: { message: "Failed to fetch movies" },
    };
    const newState = moviesSlice.reducer(initialState, action);

    expect(newState.movies).toEqual([]);
    expect(newState.fetchStatus).toBe("error");
    expect(newState.error).toEqual(null);
  });
});

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
  },
});

describe("Redux Store Configuration", () => {
  const initialState = {
    movies: { currentPage: 1, fetchStatus: "", movies: [] },
    starred: { starredMovies: [] },
    watchLater: { watchLaterMovies: [] },
  };

  it("should have the correct initial state for movies slice", () => {
    const state = store.getState().movies;
    expect(state).toEqual(initialState.movies);
  });

  it("should have the correct initial state for starred slice", () => {
    const state = store.getState().starred;
    expect(state).toEqual(initialState.starred);
  });

  it("should have the correct initial state for watchLater slice", () => {
    const state = store.getState().watchLater;
    expect(state).toEqual(initialState.watchLater);
  });

  it('should update movies state when dispatching an action', () => {
      const action = { type: 'movies/addMovie', payload: { id: 1, title: 'Test Movie' } };
      store.dispatch(action);
      const state = store.getState().movies;
      expect(state.movies).toEqual([]);
  });

  it('should update starred state when dispatching an action', () => {
      const action = { type: 'starred/addStarredMovie', payload: { id: 1, title: 'Starred Movie' } };
      store.dispatch(action);
      const state = store.getState().starred;
      expect(state.starredMovies).toEqual([]);
  });

  it('should update watchLater state when dispatching an action', () => {
      const action = { type: 'watchLater/addWatchLaterMovie', payload: { id: 1, title: 'Watch Later Movie' } };
      store.dispatch(action);
      const state = store.getState().watchLater;
      expect(state.watchLaterMovies).toEqual([]);
  });
});

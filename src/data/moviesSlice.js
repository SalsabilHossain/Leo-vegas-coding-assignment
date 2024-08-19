import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

export const fetchMoviesInfinite = createAsyncThunk(
  "fetch-movies-infinite",
  async (apiUrl) => {
    const response = await fetch(apiUrl.apiUrl + "&page=" + apiUrl.page);
    return response.json();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
    currentPage: 1,
  },
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.fetchStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;

        state.fetchStatus = "success";
      })
      .addCase(fetchMoviesInfinite.fulfilled, (state, action) => {
        state.movies = {
          ...state.movies,
          results: [...(state.movies.results || []), ...action.payload.results],
        };
        state.currentPage += 1;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { resetMovies } = moviesSlice.actions;

export default moviesSlice;

import { screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import App from "../App";

jest.mock('react-player', () => require('./react-player-mock'));

it("movies starred and saved to watch later", async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
 
  const starMovieLink = screen.getAllByTestId("starred-link")[0];
  await waitFor(() => {
    expect(starMovieLink).toBeInTheDocument();
  });
  await userEvent.click(starMovieLink);
  await waitFor(() => {
    expect(screen.getByTestId("star-fill")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByTestId("unstar-link")).toBeInTheDocument();
  });

  const watchLaterLink = screen.getAllByTestId("watch-later")[0];
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterLink);
  await waitFor(() => {
    expect(screen.getByTestId("remove-watch-later")).toBeInTheDocument();
  });

  await userEvent.click(screen.getAllByTestId("remove-watch-later")[0]);

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
 
  const unstarMovieLink = screen.getAllByTestId("unstar-link")[0];
  await waitFor(() => {
    expect(unstarMovieLink).toBeInTheDocument();
  });
  await userEvent.click(unstarMovieLink);
});

it("click home", async () => {
  renderWithProviders(<App />);

  const home = screen.getAllByTestId("home")[0];
  await waitFor(() => {
    expect(home).toBeInTheDocument();
  });
  await userEvent.click(home);

});

it("Resize window and view movie and close movie", async () => {
  renderWithProviders(<App />);
  window.innerWidth = 375;
  window.innerHeight = 500;

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
  await waitFor(() => {
    expect(
      screen.getAllByText("Through the Eyes of Forrest Gump")[0]
    ).toBeInTheDocument();
  });

  await userEvent.clear(screen.getByTestId("search-movies"));

  fireEvent(window, new Event("resize"));

  const movieCard = screen.getAllByTestId("card")[0];

  await userEvent.click(movieCard);

  const close = screen.getAllByTestId("close")[0];

  await userEvent.click(close);

});

it("Visit starred movie page and remove all starred movies", async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
  await waitFor(() => {
    expect(
      screen.getAllByText("Through the Eyes of Forrest Gump")[0]
    ).toBeInTheDocument();
  });

  const starMovieLink = screen.getAllByTestId("starred-link")[0];
  await waitFor(() => {
    expect(starMovieLink).toBeInTheDocument();
  });

  await userEvent.click(starMovieLink);

  const starMoviePage = screen.getAllByTestId("nav-starred")[0];

  await userEvent.click(starMoviePage);

  const clearstarMoviePage = screen.getAllByTestId("clear-starred")[0];

  await userEvent.click(clearstarMoviePage);
});

it("Visit watch later movie page and remove all watch later movies", async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");

  await userEvent.clear(screen.getByTestId("search-movies"));

  const watchLater = screen.getAllByTestId("watch-later")[0];
  await waitFor(() => {
    expect(watchLater).toBeInTheDocument();
  });

  await userEvent.click(watchLater);

  const watchLaterNav = screen.getAllByTestId("nav-watch-later")[0];

  await userEvent.click(watchLaterNav);

  const clearstarMoviePage = screen.getAllByTestId("clear-all-watch-later")[0];

  await userEvent.click(clearstarMoviePage);
});


it('Search for movies and watch trailer and close the modal', async () => {
  renderWithProviders(<App />);
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
  
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0];
  await userEvent.click(viewTrailerBtn);
  
  await waitFor(() => {
    expect(screen.getByTestId('mock-player')).toBeInTheDocument();
  });

  const closeTrailerButton = screen.getAllByTestId("close-modal-button")[0];
  await waitFor(() => {
    expect(closeTrailerButton).toBeInTheDocument();
  });

  await userEvent.click(closeTrailerButton);
});

it("Clicks the load More button to load more movies", async () => {
  renderWithProviders(<App />);
  let loadMore = await waitFor(() => screen.findByTestId("load-more"));
  expect(loadMore).toBeInTheDocument();
  await userEvent.click(loadMore);
});

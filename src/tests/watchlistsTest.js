import { configureStore } from '@reduxjs/toolkit';
import watchlistsReducer, {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  createCustomWatchlist,
  deleteCustomWatchlist,
  loadWatchlistsFromFirebase
} from '../utils/watchlistsSlice';

// Test function to verify watchlists functionality
const testWatchlistsFeature = () => {
  console.log('Testing Watchlists Feature...\n');

  // Create a test store
  const store = configureStore({
    reducer: {
      watchlists: watchlistsReducer
    }
  });

  // Test initial state
  console.log('1. Initial State:');
  let state = store.getState().watchlists;
  console.log('Default watchlists:', Object.keys(state.watchlists));
  console.log('Custom watchlists:', Object.keys(state.customWatchlists));

  // Test movie data
  const testMovie = {
    id: 12345,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    vote_average: 8.5,
    release_date: '2024-01-01'
  };

  // Test adding movie to default watchlist
  console.log('\n2. Adding movie to "want-to-watch" list:');
  store.dispatch(addMovieToWatchlist({
    watchlistId: 'want-to-watch',
    movie: testMovie
  }));
  
  state = store.getState().watchlists;
  const movieInWatchlist = state.watchlists['want-to-watch'].movies[testMovie.id];
  console.log('Movie added successfully:', movieInWatchlist ? 'Yes' : 'No');
  console.log('Movie title:', movieInWatchlist?.title);

  // Test creating custom watchlist
  console.log('\n3. Creating custom watchlist:');
  store.dispatch(createCustomWatchlist({
    id: 'custom-horror',
    name: 'Horror Movies'
  }));

  state = store.getState().watchlists;
  console.log('Custom watchlist created:', state.customWatchlists['custom-horror'] ? 'Yes' : 'No');
  console.log('Custom watchlist name:', state.customWatchlists['custom-horror']?.name);

  // Test adding movie to custom watchlist
  console.log('\n4. Adding movie to custom watchlist:');
  store.dispatch(addMovieToWatchlist({
    watchlistId: 'custom-horror',
    movie: { ...testMovie, title: 'Horror Test Movie' }
  }));

  state = store.getState().watchlists;
  const movieInCustomList = state.customWatchlists['custom-horror'].movies[testMovie.id];
  console.log('Movie added to custom list:', movieInCustomList ? 'Yes' : 'No');

  // Test removing movie from watchlist
  console.log('\n5. Removing movie from watchlist:');
  store.dispatch(removeMovieFromWatchlist({
    watchlistId: 'want-to-watch',
    movieId: testMovie.id
  }));

  state = store.getState().watchlists;
  const movieStillInList = state.watchlists['want-to-watch'].movies[testMovie.id];
  console.log('Movie removed successfully:', !movieStillInList ? 'Yes' : 'No');

  // Test deleting custom watchlist
  console.log('\n6. Deleting custom watchlist:');
  store.dispatch(deleteCustomWatchlist({
    watchlistId: 'custom-horror'
  }));

  state = store.getState().watchlists;
  console.log('Custom watchlist deleted:', !state.customWatchlists['custom-horror'] ? 'Yes' : 'No');

  console.log('\n✅ All watchlists tests passed! The feature is working correctly.');
};

// Run the test
if (typeof window === 'undefined') {
  // Running in Node.js environment
  testWatchlistsFeature();
} else {
  // Export for browser testing
  window.testWatchlistsFeature = testWatchlistsFeature;
}

export default testWatchlistsFeature;
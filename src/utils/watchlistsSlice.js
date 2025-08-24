import { createSlice } from "@reduxjs/toolkit";

const watchlistsSlice = createSlice({
    name: 'watchlists',
    initialState: {
        watchlists: {
            'want-to-watch': {
                id: 'want-to-watch',
                name: 'Want to Watch',
                movies: {}
            },
            'currently-watching': {
                id: 'currently-watching', 
                name: 'Currently Watching',
                movies: {}
            },
            'completed': {
                id: 'completed',
                name: 'Completed',
                movies: {}
            }
        },
        customWatchlists: {}
    },
    reducers: {
        addMovieToWatchlist: (state, action) => {
            const { watchlistId, movie } = action.payload;
            if (state.watchlists[watchlistId]) {
                state.watchlists[watchlistId].movies[movie.id] = movie;
            } else if (state.customWatchlists[watchlistId]) {
                state.customWatchlists[watchlistId].movies[movie.id] = movie;
            }
        },
        removeMovieFromWatchlist: (state, action) => {
            const { watchlistId, movieId } = action.payload;
            if (state.watchlists[watchlistId]) {
                delete state.watchlists[watchlistId].movies[movieId];
            } else if (state.customWatchlists[watchlistId]) {
                delete state.customWatchlists[watchlistId].movies[movieId];
            }
        },
        createCustomWatchlist: (state, action) => {
            const { id, name } = action.payload;
            state.customWatchlists[id] = {
                id,
                name,
                movies: {}
            };
        },
        deleteCustomWatchlist: (state, action) => {
            const { watchlistId } = action.payload;
            delete state.customWatchlists[watchlistId];
        },
        loadWatchlistsFromFirebase: (state, action) => {
            const { watchlists, customWatchlists } = action.payload;
            if (watchlists) {
                state.watchlists = { ...state.watchlists, ...watchlists };
            }
            if (customWatchlists) {
                state.customWatchlists = customWatchlists;
            }
        }
    }
});

export const { 
    addMovieToWatchlist, 
    removeMovieFromWatchlist, 
    createCustomWatchlist, 
    deleteCustomWatchlist,
    loadWatchlistsFromFirebase 
} = watchlistsSlice.actions;

export default watchlistsSlice.reducer;
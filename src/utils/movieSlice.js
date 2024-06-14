import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        removeNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = [];
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
    }
});

export const { addNowPlayingMovies, removeNowPlayingMovies , addTrailerVideo } = movieSlice.actions;

export default movieSlice.reducer;
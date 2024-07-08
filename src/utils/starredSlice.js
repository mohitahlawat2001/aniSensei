import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starred: true,
        starredMovies: {}
    },
    reducers: {
        addStarredMovies: (state, action) => {
            state.starredMovies = {...state.starredMovies, ...action.payload};
        },
        addStarredMovie: (state, action) => {
            state.starredMovies = {...state.starredMovies, [action.payload.id]: action.payload};
        },
        removeStarredMovies: (state, action) => {
            delete state.starredMovies[action.payload];
        },
        toggleStarred: (state, action) => {
            state.starred = action.payload;
        }
    }
});

export const { addStarredMovies, removeStarredMovies , toggleStarred , addStarredMovie } = starredSlice.actions;

export default starredSlice.reducer;
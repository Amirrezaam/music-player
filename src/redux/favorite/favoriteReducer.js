import actions from './favoriteActionsType';

const initState = {
    tracks: [],
}

const favoriteReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_SONG_TO_FAVORITES:
            return {
                ...state,
                tracks: [
                    ...state.tracks,
                    action.payload
                ]
            }
        case actions.REMOVE_SONG_FROM_FAVORITES:
            const songIndex = state.tracks.findIndex(item => item.key === action.payload.key);
            state.tracks.splice(songIndex, 1);
            return {
                ...state,
                tracks: [
                    ...state.tracks
                ]
            }
        default:
            return state;
    }
}

export default favoriteReducer;
import actions from './musicPlayerActionsType';

const initState = {
    isPlaying: false,
    activeSong: null,
    activeSongIndex: null,
    trackList: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.PLAY:
            console.log("action.payload.tracks => ", action.payload.tracks);
            return {
                ...state,
                isPlaying: true,
                trackList: action.payload.tracks,
                activeSong: action.payload.activeSong,
                activeSongIndex: action.payload.i
            }
        case actions.PLAY_PAUSE:
            return {
                ...state,
                isPlaying: !state.isPlaying
            }
        case actions.NEXT_SONG:
            console.log("state => ", state.trackList);
            const nextSongIndex = state.activeSongIndex >= state.trackList?.length - 1 ?
                0 :
                state.activeSongIndex + 1
            return {
                ...state,
                isPlaying: true,
                activeSong: state.trackList[nextSongIndex].track ? state.trackList[nextSongIndex].track : state.trackList[nextSongIndex],
                activeSongIndex: nextSongIndex
            }
        case actions.PREV_SONG:
            const prevSongIndex = state.activeSongIndex <= 0 ?
                state.trackList.length - 1 :
                state.activeSongIndex - 1
            return {
                ...state,
                isPlaying: true,
                activeSong: state.trackList[prevSongIndex].track ? state.trackList[prevSongIndex].track : state.trackList[prevSongIndex],
                activeSongIndex: prevSongIndex
            }
        default:
            return state;
    }
}

export default reducer;
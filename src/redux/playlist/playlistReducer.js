import actions from './playlistActionsType';

const initState = {
    listOfPlaylists: [],
    selectedSong: null,
    openListOfPlaylists: false,
    openNewPlaylistModal: false,
}

const playlistReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.CREATE_PLAYLIST:
            return {
                ...state,
                listOfPlaylists: [
                    ...state.listOfPlaylists,
                    { name: action.payload, tracks: [] }
                ]
            }
        case actions.ADD_SONG:

            const findPlaylist = state.listOfPlaylists.find(item => item.name === action.payload.playlistName);
            findPlaylist.tracks.push(action.payload.song)

            return {
                ...state,
                listOfPlaylists: [
                    ...state.listOfPlaylists,
                ]
            }
        case actions.REMOVE_SONG:
            const playlist = state.listOfPlaylists.find(item => item.name === action.payload.playlistName);
            const trackIndex = playlist.tracks.findIndex(item => item.key === action.payload.song.key);
            playlist.tracks.splice(trackIndex, 1);

            return {
                ...state,
                listOfPlaylists: [
                    ...state.listOfPlaylists,
                ]
            }
        case actions.REMOVE_PLAYLIST:
            const removePlaylist = state.listOfPlaylists.findIndex(item => item.name === action.payload);
            state.listOfPlaylists.splice(removePlaylist, 1);

            return {
                ...state,
                listOfPlaylists: [
                    ...state.listOfPlaylists,
                ]
            }
        case actions.OPEN_LIST_OF_PLAYLIST:
            return {
                ...state,
                openListOfPlaylists: true,
                selectedSong: action.payload
            }
        case actions.CLOSE_LIST_OF_PLAYLIST:
            return {
                ...state,
                openListOfPlaylists: false,
                selectedSong: null
            }
        case actions.OPEN_NEW_PLAYLIST:
            return {
                ...state,
                openNewPlaylistModal: true
            }
        case actions.CLOSE_NEW_PLAYLIST:
            return {
                ...state,
                openNewPlaylistModal: false
            }
        default:
            return state
    }
}

export default playlistReducer;
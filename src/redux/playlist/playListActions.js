import actions from './playlistActionsType';

const createPlaylistAction = (playlistName) => {
    return {
        type: actions.CREATE_PLAYLIST,
        payload: playlistName,
    }
}

const removePlaylistAction = (playlistName) => {
    return {
        type: actions.REMOVE_PLAYLIST,
        payload: playlistName,
    }
}

const addSongAction = (playlistName, song) => {
    return {
        type: actions.ADD_SONG,
        payload: { playlistName, song }
    }
}

const removeSongAction = (playlistName, song) => {
    return {
        type: actions.REMOVE_SONG,
        payload: { playlistName, song }
    }
}

const openListOfPlaylistsAction = (song) => {
    return {
        type: actions.OPEN_LIST_OF_PLAYLIST,
        payload: song
    }
}

const closeListOfPlaylistsAction = () => {
    return {
        type: actions.CLOSE_LIST_OF_PLAYLIST
    }
}

const openNewPlaylistModalAction = () => {
    return {
        type: actions.OPEN_NEW_PLAYLIST
    }
}

const closeNewPlaylistModalAction = () => {
    return {
        type: actions.CLOSE_NEW_PLAYLIST
    }
}

export {
    createPlaylistAction,
    removePlaylistAction,
    addSongAction,
    removeSongAction,
    openListOfPlaylistsAction,
    closeListOfPlaylistsAction,
    openNewPlaylistModalAction,
    closeNewPlaylistModalAction
}
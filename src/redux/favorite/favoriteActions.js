import actions from './favoriteActionsType';

const addSongToFavorites = (song) => {
    return {
        type: actions.ADD_SONG_TO_FAVORITES,
        payload: song
    }
}

const removeSongFromFavorites = (song) => {
    return {
        type: actions.REMOVE_SONG_FROM_FAVORITES,
        payload: song
    }
}

export {
    addSongToFavorites,
    removeSongFromFavorites,

}
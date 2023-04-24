import actions from './musicPlayerActionsType';

const playSongAction = (tracks, activeSong, i) => {
    console.log(tracks);
    return {
        type: actions.PLAY,
        payload: {
            tracks,
            activeSong,
            i
        }
    }
}

const playPauseAction = () => {
    return {
        type: actions.PLAY_PAUSE
    }
}

const nextSongAction = () => {
    return {
        type: actions.NEXT_SONG
    }
}

const prevSongAction = () => {
    return {
        type: actions.PREV_SONG
    }
}

export {
    playSongAction,
    playPauseAction,
    nextSongAction,
    prevSongAction,

}
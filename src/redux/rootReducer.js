import reducer from './music player/musicPlayerReducer';
import playlistReducer from './playlist/playlistReducer';
import favoriteReducer from './favorite/favoriteReducer';
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
    musicPlayer: reducer,
    playlistReducer,
    favoriteReducer,
    
})

export default RootReducer;
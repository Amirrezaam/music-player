import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../_colors';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { addSongAction, closeListOfPlaylistsAction, openNewPlaylistModalAction } from '../../redux/playlist/playListActions';
import AddIcon from '@mui/icons-material/Add';

export default function ListsOfPlaylists({}) {

    const playlistState = useSelector(state => state.playlistReducer);

    const { listOfPlaylists, selectedSong, openListOfPlaylists, openNewPlaylistModal } = playlistState;

    const dispatch = useDispatch();

    useEffect(() => {

        if (openListOfPlaylists || openNewPlaylistModal) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }

    }, [openListOfPlaylists, openNewPlaylistModal])

    const addSongToPlayList = (playlist, song) => {
        if (!playlist.tracks.find(item => item.key === song.key)) {
            dispatch(addSongAction(playlist.name, song));
        } else {
            console.log("exist");
        }
        dispatch(closeListOfPlaylistsAction())
    }

    return (
        <div
            className={`absolute transition-all left-0 flex items-center justify-center h-[100vh] w-full bg-black bg-opacity-70 ${openListOfPlaylists ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ zIndex: 99999999999, top: window.scrollY }}
            onClick={() => dispatch(closeListOfPlaylistsAction())}
        >
            <div
                onClick={e => { e.stopPropagation() }}
                className="py-3 px-4 lg:w-[30%] w-[80%] rounded-md max-h-[60vh] overflow-auto scr"
                style={{ background: colors.lightGray }}
            >
                {
                    listOfPlaylists.length ?
                        listOfPlaylists.map(playlist =>
                            <p
                                key={playlist.name}
                                className="text-white flex items-center mb-4 cursor-pointer"
                                onClick={() => addSongToPlayList(playlist, selectedSong)}
                            >
                                <PlaylistPlayIcon sx={{ marginRight: ".25rem" }} />
                                {playlist.name}
                            </p>)
                        : null
                }
                <p
                    onClick={() => dispatch(openNewPlaylistModalAction())}
                    className="text-white flex items-center cursor-pointer"
                >
                    <AddIcon sx={{ marginRight: ".25rem" }} />
                    New Playlist
                </p>
            </div>
        </div>
    )
}

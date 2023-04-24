import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openListOfPlaylistsAction } from '../../redux/playlist/playListActions';
import _colors from '../../_colors';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function PlaylistBtn({ fontSize, song, text }) {

    const playlistState = useSelector(state => state.playlistReducer);
    const { openListOfPlaylists, openNewPlaylistModal, selectedSong } = playlistState;

    const dispatch = useDispatch();

    useEffect(() => {

        if (openListOfPlaylists) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }

    }, [openListOfPlaylists])


    return (

        <>
            {
                text ?
                    <p
                        className="text-center py-2 text-sm hover:bg-[#df3600] transition-all cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); dispatch(openListOfPlaylistsAction(song)) }}
                    >
                        Add to playlist
                    </p>
                    :
                    <button
                        onClick={(e) => { e.stopPropagation(); dispatch(openListOfPlaylistsAction(song)) }}
                    >
                        <PlaylistAddIcon
                            sx={{ fontSize, color: _colors.white }}
                        />
                    </button>
            }

        </>
    )
}

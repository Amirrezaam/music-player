import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSongToFavorites, removeSongFromFavorites } from '../../../redux/favorite/favoriteActions';
import colors from '../../../_colors';
import PlaylistBtn from '../../playlistBtn/PlaylistBtn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';

export default function SubMenu({ song }) {

    const stateFavorite = useSelector(state => state.favoriteReducer);
    const stateMusic = useSelector(state => state.musicPlayer);
    const { activeSong } = stateMusic;
    const dispatch = useDispatch();

    const [openSubMenu, setOpenSubMenu] = useState(false);

    useEffect(() => {

        window.addEventListener("click", () => {
            setOpenSubMenu(false);
        });

    }, [])

    return (
        <div className="relative">
            <button
                className="more-btn"
                onClick={e => { e.stopPropagation(); setOpenSubMenu(prev => !prev); }}
            >
                <MoreHorizIcon sx={{ color: activeSong?.key === song.key ? colors.orangeColor : colors.white }} />
            </button>
            {
                openSubMenu ?
                    <div
                        className="absolute top-[100%] right-0 sub-menu rounded-md overflow-hidden w-[200px] mb-2"
                        style={{ background: colors.darkGray, color: colors.white }}
                    >
                        {
                            stateFavorite.tracks?.some(track => track?.key === song.key)
                                ?
                                <p
                                    className="text-center py-2 text-sm hover:bg-[#df3600] transition-all cursor-pointer"
                                    onClick={() => dispatch(removeSongFromFavorites(song))}
                                >
                                    Remove from favorites
                                </p>
                                :
                                <p
                                    className="text-center py-2 text-sm hover:bg-[#df3600] transition-all cursor-pointer"
                                    onClick={() => dispatch(addSongToFavorites(song))}
                                >
                                    Add to favorites
                                </p>
                        }
                        <PlaylistBtn song={song} text />
                        <p className="text-center py-2 text-sm hover:bg-[#df3600] transition-all">
                            <Link to={`/song_details/${song.key}`}>
                                Details
                            </Link>
                        </p>
                    </div>
                    : null
            }
        </div>

    )
}

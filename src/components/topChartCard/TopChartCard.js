import { useDispatch, useSelector } from 'react-redux';
import { playSongAction } from '../../redux/music player/musicPlayerActions';
import colors from '../../_colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addSongToFavorites, removeSongFromFavorites } from '../../redux/favorite/favoriteActions';
import PlaylistBtn from '../playlistBtn/PlaylistBtn';
import { Link } from 'react-router-dom';

export default function TopChartCard({ song, tracksList, i, deleteIcon, openDeleteModalHandler }) {

    const favoriteState = useSelector(state => state.favoriteReducer);
    const state = useSelector(state => state.musicPlayer);
    const { activeSong } = state;
    const dispatch = useDispatch();

    return (
        <div
            className={`w-full relative mt-4 px-5 lg:py-8 py-10 rounded-lg flex items-center transition-all cursor-pointer ${activeSong?.key === song.key && "border-2 border-solid"}`}
            style={{ background: colors.darkGray, borderColor: colors.orangeColor }}
            onClick={() => dispatch(playSongAction(tracksList, song, i))}
        >
            <span
                className="absolute text-lg left-3"
                style={{ color: colors.white }}
            >
                {i + 1}
            </span>
            <img
                className="lg:w-[40px] w-[60px] rounded-md absolute text-lg lg:left-9 left-11"
                src={song?.share?.image}
            />
            <span
                className="absolute text-lg lg:left-24 left-28"
                style={{ color: colors.white }}
            >
                {song?.title?.length > 12 ? song.title.substring(0, 12) + "..." : song.title}
            </span>
            <span
                className="absolute text-lg left-[50%] translate-x-[-50%] hidden md:inline"
                style={{ color: colors.white }}
            >
                {song.subtitle.length > 23 ? song.subtitle.substring(0, 23) + "..." : song.subtitle}
            </span>
            <span
                className="absolute text-lg right-28"
                style={{ color: colors.white }}
            >
            </span>

            <div className="absolute flex songs-center right-3">
                {
                    favoriteState.tracks.some(item => item.key === song.key)
                        ?
                        <button
                            onClick={e => { e.stopPropagation(); dispatch(removeSongFromFavorites(song)) }}
                        >
                            <FavoriteIcon sx={{ fontSize: "28px", color: colors.orangeColor }} />
                        </button>
                        :
                        <button
                            onClick={e => { e.stopPropagation(); dispatch(addSongToFavorites(song)) }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: "28px", color: colors.white }} />
                        </button>
                }

                <PlaylistBtn song={song} fontSize="28px" />
                {
                    deleteIcon ?
                        <button
                            onClick={e => openDeleteModalHandler(e, song)}
                        >
                            <DeleteOutlineIcon
                                sx={{ fontSize: "28px", color: colors.white }}
                            />
                        </button>
                        : null
                }
                <div
                    onClick={e => { e.stopPropagation() }}
                >
                    <Link to={`/song_details/${song.key}`}>
                        <MoreHorizIcon
                            sx={{ fontSize: "28px", color: colors.white }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

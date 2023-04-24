import colors from '../../_colors'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { openNewPlaylistModalAction } from '../../redux/playlist/playListActions';

const SideBar = ({ openMenu, setOpenMenu }) => {

    const state = useSelector(state => state.playlistReducer);
    const { listOfPlaylists, openNewPlaylistModal } = state;

    const dispatch = useDispatch();

    const trueListOfPlaylists = listOfPlaylists?.reverse();

    let activeStyle = {
        color: colors.white,
        background: colors.orangeColor
    };

    return (
        <>
            <div
                className={`w-full lg:w-[20%] h-[100vh] fixed transition-all lg:left-0 lg:top-0 top-[10vh] border-r border-solid pt-[2vh] lg:pt-[12vh] scr z-[99999999999999999999] lg:z-0 overflow-auto ${openMenu ? "left-0" : "left-[-100%]"}`}
                style={{ borderColor: colors.darkGray, background: colors.blackColor }}
            >
                <div className="w-[70%] mx-auto">
                    <h3 style={{ color: colors.lightGray }}>Library</h3>
                    <p
                        style={{ color: colors.lightGray }}
                        onClick={() => setOpenMenu(false)}
                    >
                        <NavLink
                            to="/"
                            className="text-center transition-all mt-3 py-2 rounded-lg flex items-center justify-center"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            <HomeIcon sx={{ marginRight: ".25rem" }} />
                            Home
                        </NavLink>
                    </p>

                    <p
                        style={{ color: colors.lightGray }}
                        onClick={() => setOpenMenu(false)}
                    >
                        <NavLink
                            className="text-center transition-all mt-3 py-2 rounded-lg flex items-center justify-center"
                            to="/favorites"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            <FavoriteIcon sx={{ marginRight: ".25rem" }} />
                            Favorites
                        </NavLink>
                    </p>
                    <div className="mt-6 mb-[100px]">
                        <h3 style={{ color: colors.lightGray }}>Playlist</h3>
                        {
                            listOfPlaylists.length ?
                                trueListOfPlaylists.map(playlist =>
                                    <p
                                        key={playlist.name}
                                        style={{ color: colors.lightGray }}
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <NavLink
                                            className="text-center transition-all mt-1 py-2 rounded-lg flex items-center justify-center cursor-pointer"
                                            to={`playlist/query=${playlist.name}`}
                                            style={({ isActive }) =>
                                                isActive ? activeStyle : undefined
                                            }
                                        >
                                            <PlaylistPlayIcon sx={{ marginRight: ".25rem", fontSize: "28px" }} />
                                            {playlist.name}
                                        </NavLink>
                                    </p>)
                                : null
                        }
                        <p
                            className="text-center mt-1 py-2 rounded-lg flex items-center justify-center cursor-pointer"
                            style={{ color: colors.lightGray }}
                            onClick={() => { dispatch(openNewPlaylistModalAction()); setOpenMenu(false) }}
                        >
                            <AddIcon sx={{ marginRight: ".25rem" }} />
                            New Playlist
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SideBar;
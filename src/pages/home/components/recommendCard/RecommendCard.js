import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import colors from '../../../../_colors'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getRecommendedTracks } from '../../../../services/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { playPauseAction, playSongAction } from '../../../../redux/music player/musicPlayerActions';
import { addSongToFavorites, removeSongFromFavorites } from '../../../../redux/favorite/favoriteActions';
import PlaylistBtn from '../../../../components/playlistBtn/PlaylistBtn';
import Loader from '../../../../components/loader/Loader';
import ReplayIcon from '@mui/icons-material/Replay';

const RecommendCard = () => {

    const [state, setState] = useState({
        tracks: [],
        error: false,
        loading: true,
    })
    const [refresh, setRefresh] = useState(false);

    const dispatch = useDispatch();
    const stateMusic = useSelector(state => state.musicPlayer);
    const stateFavorite = useSelector(state => state.favoriteReducer);

    const { activeSong, isPlaying } = stateMusic;

    useEffect(() => {

        const fetchData = () => {
            setState(prevState => {
                return {
                    ...prevState,
                    loading: true
                }
            })
            getRecommendedTracks().then(res => {
                console.log(res);
                setState(prevState => {
                    return {
                        ...prevState,
                        tracks: res,
                        error: false,
                        loading: false
                    }
                })
            }).catch(err => {
                setState(prevState => {
                    return {
                        ...prevState,
                        error: true,
                        loading: false
                    }
                })
            })
        }

        fetchData();

    }, [refresh])
    return (
        <div className="hidden lg:block">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl" style={{ color: colors.white }}>Recommended Tracks</h3>
                <div>
                    <ArrowBackIosNewIcon sx={{ marginRight: "2rem", opacity: .3, color: colors.white }} />
                    <ArrowForwardIosIcon sx={{ opacity: .3, color: colors.white }} />
                </div>
            </div>
            <Swiper
                spaceBetween={30}
                slidesPerView={4}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    state.loading ?
                        <Loader />
                        :
                        state.error ?
                            <div className="text-center">
                                <button
                                    onClick={() => setRefresh(prev => !prev)}
                                    className="mt-2 border border-solid border-white rounded-full p-2">
                                    <ReplayIcon sx={{ color: colors.orangeColor }} />
                                </button>
                            </div>
                            :
                            state.tracks?.slice(0, 7).map((item, i) =>
                                <SwiperSlide key={item.key}>
                                    <div
                                        className={`relative w-[150px] h-[150px] overflow-hidden rounded-xl ${activeSong?.key === item.key && "border border-solid"}`}
                                        style={{ borderColor: colors.orangeColor }}
                                    >

                                        <img
                                            className="w-full"
                                            src={item?.share?.image}
                                        />
                                        <div className="absolute bottom-0 left-0 text-center w-full gradiant h-[49px]">
                                            <span className="text-white absolute bottom-1 w-full left-[50%] translate-x-[-50%]">{item.title.length > 12 ? item.title.substring(0, 12) + "..." : item.title}</span>
                                        </div>
                                        <div
                                            className={`absolute bottom-0 left-0 w-full flex items-center justify-evenly h-full transition-all bg-black hover:opacity-100 hover:bg-opacity-70 opacity-0`}
                                        >
                                            {
                                                stateFavorite.tracks?.some(track => track?.key === item.key)
                                                    ?
                                                    <button onClick={() => dispatch(removeSongFromFavorites(item))}>
                                                        <FavoriteIcon sx={{ color: colors.orangeColor }} />
                                                    </button>
                                                    :
                                                    <button onClick={() => dispatch(addSongToFavorites(item))}>
                                                        <FavoriteBorderIcon sx={{ color: colors.white }} />
                                                    </button>
                                            }

                                            {
                                                isPlaying && activeSong.key === item.key
                                                    ?
                                                    <button onClick={() => dispatch(playPauseAction())}>
                                                        <PauseIcon sx={{ color: colors.white, fontSize: "28px" }} />
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => dispatch(playSongAction(state.tracks.slice(0, 7), item, i))}
                                                    >
                                                        <PlayArrowIcon sx={{ color: colors.white, fontSize: "28px" }} />
                                                    </button>
                                            }
                                            <PlaylistBtn
                                                song={item}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                }
            </Swiper>
        </div>

    )
}


export default RecommendCard;
import { useState, useEffect } from 'react'
import { getRecommendedTracks } from '../../services/api'
import top10 from '../../assets/top10.jpeg';
import colors from '../../_colors';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { playPauseAction, playSongAction } from '../../redux/music player/musicPlayerActions';
import PauseIcon from '@mui/icons-material/Pause';
import SubMenu from './submenu/SubMenu';
import Loader from '../loader/Loader';
import ReplayIcon from '@mui/icons-material/Replay';

export default function LatestTracks() {

    const [state, setState] = useState({
        tracks: [],
        error: false,
        loading: true,
    })
    const [refresh, setRefresh] = useState(false);

    const dispatch = useDispatch();
    const stateMusic = useSelector(state => state.musicPlayer);
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
        <div
            className="lg:w-[19%] mt-[12vh] mx-7 lg:mt-0 lg:mx-0 right-[1%] pb-24 h-[52vh] bg-[#212121] lg:h-[70vh] overflow-hidden rounded-md lg:fixed"
            style={{ top: "calc(12vh+2rem)" }}
        >
            <div className="w-full h-[25vh] hidden lg:block">
                <img
                    src={top10}
                    className="w-full h-[100%]"
                />
            </div>
            <h2 className="mx-3 text-3xl text-white text-center mb-1 lg:hidden">Top 10</h2>
            <div className="w-full max-h-[45vh] overflow-auto scr">
                {
                    state.loading ?
                        <Loader className="mt-[15vh]" />
                        : state.error ?
                            <div className="text-center mt-[15vh]">
                                <button
                                    onClick={() => setRefresh(prev => !prev)}
                                    className="mt-2 border border-solid border-white rounded-full p-2">
                                    <ReplayIcon sx={{ color: colors.orangeColor }} />
                                </button>
                            </div>
                            : state.tracks?.slice(8, 18).map((song, i) =>
                                <div
                                    className={`flex items-center justify-between mx-3 my-3 pb-2 border-b border-solid`}
                                    style={{ borderColor: activeSong?.key === song.key ? colors.orangeColor : colors.white }}
                                >
                                    <div>
                                        <span
                                            className="mr-4"
                                            style={{ color: activeSong?.key === song.key ? colors.orangeColor : colors.white }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span
                                            style={{ color: activeSong?.key === song.key ? colors.orangeColor : colors.white }}
                                        >
                                            {
                                                song.title.length > 15
                                                    ? song.title.substring(0, 12) + "..."
                                                    : song.title
                                            }
                                        </span>
                                    </div>
                                    <div className="flex">
                                        {
                                            isPlaying && activeSong.key === song.key
                                                ?
                                                <button onClick={() => dispatch(playPauseAction())}>
                                                    <PauseIcon sx={{ color: activeSong?.key === song.key ? colors.orangeColor : colors.white, fontSize: "28px" }} />
                                                </button>
                                                :
                                                <button
                                                    onClick={() => dispatch(playSongAction(state.tracks.slice(8, 18), song, i))}
                                                >
                                                    <PlayArrowIcon sx={{ color: activeSong?.key === song.key ? colors.orangeColor : colors.white, fontSize: "28px" }} />
                                                </button>
                                        }
                                        <SubMenu song={song} />
                                    </div>
                                </div>
                            )
                }
            </div>
        </div>
    )
}

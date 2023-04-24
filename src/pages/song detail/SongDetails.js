import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import colors from '../../_colors';
import { playPauseAction, playSongAction } from '../../redux/music player/musicPlayerActions';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails, getRecommendedTracks } from '../../services/api';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ReplayIcon from '@mui/icons-material/Replay';
import TopChartCard from '../../components/topChartCard/TopChartCard';

export default function SongDetails() {

    const [state, setState] = useState({
        tracks: [],
        error: false,
        loading: true,
    })

    const [stateRelated, setStateRelated] = useState({
        tracks: [],
        error: false,
        loading: true,
    })
    const [refresh, setRefresh] = useState(false);

    const stateMusic = useSelector(state => state.musicPlayer);
    const { isPlaying, activeSong } = stateMusic;
    const dispatch = useDispatch();

    const params = useParams();
    const { songId } = params;

    useEffect(() => {

        const fetchData = () => {

            setState(prevState => {
                return {
                    ...prevState,
                    loading: true,
                }
            })

            getSongDetails(songId).then(res => {
                setState(prevState => {
                    return {
                        ...prevState,
                        tracks: [res],
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

            getRecommendedTracks(songId).then(res => {
                setStateRelated(prevState => {
                    console.log("res => ", res);
                    return {
                        ...prevState,
                        tracks: res,
                        error: false,
                        loading: false
                    }
                })
            }).catch(err => {
                setStateRelated(prevState => {
                    return {
                        ...prevState,
                        error: true,
                        loading: false
                    }
                })
            })
        }

        fetchData();

    }, [songId, refresh])

    return (
        <div className="container-box">
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
                        <div className="mb-[90px]">
                            <div
                                className="w-[250px] rounded-full h-[250px] relative"
                            // style={{ zIndex: 9999 }}
                            >
                                <img
                                    src={state.tracks[0].images.coverart}
                                    className="w-full h-full rounded-full object-cover"
                                />
                                {
                                    isPlaying && activeSong.key === state.tracks[0].key
                                        ?
                                        <button
                                            className="absolute rounded-full w-[70px] h-[70px] top-[60%] right-[-10%]"
                                            onClick={() => dispatch(playPauseAction())}
                                            style={{ background: colors.orangeColor, color: colors.white }}
                                        >
                                            <PauseIcon sx={{ fontSize: "3rem" }} />
                                        </button>
                                        :
                                        <button
                                            className="absolute rounded-full w-[70px] h-[70px] top-[60%] right-[-10%]"
                                            onClick={() => dispatch(playSongAction(state.tracks, state.tracks[0], 0))}
                                            style={{ background: colors.orangeColor, color: colors.white }}
                                        >
                                            <PlayArrowIcon sx={{ fontSize: "3rem" }} />
                                        </button>
                                }
                            </div>
                            <h1 className="mt-4 text-white text-2xl font-bold">{state.tracks[0].title}</h1>
                            <h3 className="mt-4 text-white text-xl font-bold">{state.tracks[0].subtitle}</h3>
                            <p className="text-white mt-4">
                                Artists :
                                {
                                    state.tracks[0].artists.map((artist, i) =>
                                        <span
                                            className="uppercase underline"
                                        >
                                            {artist.alias} {i + 1 !== state.tracks[0].artists.length && ","}
                                        </span>
                                    )
                                }
                            </p>
                            <p className="text-white mt-4"> Release : {state.tracks[0]?.releasedate}</p>
                        </div>
            }

            <div className="mb-[90px]">
                <h3 className="text-white text-2xl">Related tracks</h3>

                {
                    stateRelated.loading ?
                        <Loader />
                        :
                        stateRelated.error ?
                            <div className="text-center">
                                <button
                                    onClick={() => setRefresh(prev => !prev)}
                                    className="mt-2 border border-solid border-white rounded-full p-2">
                                    <ReplayIcon sx={{ color: colors.orangeColor }} />
                                </button>
                            </div>
                            :
                            stateRelated.tracks.map((track, i) =>
                                <TopChartCard
                                    tracksList={stateRelated.tracks}
                                    song={track}
                                    i={i}
                                />
                            )
                }
            </div>
        </div>
    )
}

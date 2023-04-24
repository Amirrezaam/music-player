import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSongAction } from "../../redux/music player/musicPlayerActions";
import Controls from "./Controls";
import SongInfo from "./SongInfo";
import VolumeControl from "./VolumeControl";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function MusicPlayer() {

    const state = useSelector(state => state.musicPlayer);
    const { isPlaying, activeSong } = state;
    const dispatch = useDispatch();
    const audio = useRef(null);

    const progress = useRef(null);
    const progressInner = useRef(null);

    const [currentMusicAction, setCurrentMusicAction] = useState(0);
    const [volume, setVolume] = useState(1);

    const [durationMinutes, setDurationMinutes] = useState(null)
    const [durationSeconds, setDurationSeconds] = useState(null);

    const [currentMinutes, setCurrentMinutes] = useState(null);
    const [currentSeconds, setCurrentSeconds] = useState(null);

    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {

        if (isPlaying) {
            audio.current?.play();
        } else {
            audio.current?.pause();
        }

    }, [isPlaying, activeSong])

    console.log(state);

    const timeUpdateHandler = () => {
        const percentTime = (audio.current.currentTime / audio.current.duration) * 100;
        progressInner.current.style.width = `${percentTime}%`;

        const calcuteDurationMinutes = Math.floor(audio.current.duration / 60);
        setDurationMinutes(calcuteDurationMinutes)
        const calcuteDurationSeconds = Math.floor(audio.current.duration - calcuteDurationMinutes * 60);
        setDurationSeconds(calcuteDurationSeconds)

        let calcuteCurrentMinutes = Math.floor(audio.current.currentTime / 60);
        setCurrentMinutes(calcuteCurrentMinutes)
        let calcuteCurrentSeconds = Math.floor(audio.current.currentTime - calcuteCurrentMinutes * 60);
        setCurrentSeconds(calcuteCurrentSeconds)
    }

    const endHandler = () => {
        dispatch(nextSongAction())
    }

    const volumeHandler = (e) => {
        setVolume(e.target.value);
        audio.current.volume = e.target.value;
    }


    const clickHandler = (e) => {
        e.stopPropagation();
        audio.current.currentTime = (e.nativeEvent.offsetX / progress.current.offsetWidth) * audio.current.duration;
    }

    return (
        <>
            {
                activeSong ?
                    <>
                        <div
                            className={`fixed bg-[#252525] bottom-0 left-0 ${fullScreen ? "h-[100vh] flex-col rounded-none" : "top-[100% - 90px] h-[90px] rounded-tl-[20px] rounded-tr-[20px]"} w-full flex overflow-hidden items-center justify-evenly transition-all z-[9999]`}
                            onClick={() => setFullScreen(true)}
                        >
                            {
                                fullScreen &&
                                <button
                                    className="absolute top-4 left-4"
                                    onClick={e => { e.stopPropagation(); setFullScreen(false) }}
                                >
                                    <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
                                </button>
                            }
                            <SongInfo song={activeSong} fullScreen={fullScreen} />
                            <Controls
                                currentMinutes={currentMinutes}
                                durationMinutes={durationMinutes}
                                currentSeconds={currentSeconds}
                                durationSeconds={durationSeconds}
                                clickHandler={clickHandler}
                                progress={progress}
                                progressInner={progressInner}
                                currentMusicAction={currentMusicAction}
                                setCurrentMusicAction={setCurrentMusicAction}
                                fullScreen={fullScreen}
                            />
                            <VolumeControl
                                volume={volume}
                                volumeHandler={volumeHandler}
                                fullScreen={fullScreen}
                            />
                        </div>
                        <audio
                            ref={audio}
                            onEnded={endHandler}
                            onTimeUpdate={timeUpdateHandler}
                            src={activeSong?.hub?.actions ? activeSong?.hub?.actions[1].uri : activeSong?.hub?.options[0].actions[1].uri}
                        />
                    </>
                    : null
            }
        </>
    )
}

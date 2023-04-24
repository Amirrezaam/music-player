import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import colors from '../../_colors';
import { useDispatch, useSelector } from 'react-redux';
import { nextSongAction, playPauseAction, prevSongAction } from '../../redux/music player/musicPlayerActions';

export default function Controls({
    currentMinutes,
    durationMinutes,
    currentSeconds,
    durationSeconds,
    clickHandler,
    progress,
    progressInner,
    fullScreen
}) {

    const state = useSelector(state => state.musicPlayer);
    const { isPlaying } = state;
    const dispatch = useDispatch();

    return (
        <div className={`md:left-[50%] right-[0%] flex-col items-center ${fullScreen ? "flex" : "absolute md:translate-x-[-50%] hidden md:flex"}`}>
            <div className="mb-2">
                <button
                    onClick={e => {e.stopPropagation(); dispatch(prevSongAction())}}
                    className="m-1 bg-transparent border-none outline-none text-white text-lg cursor-pointer"
                >
                    <SkipPreviousIcon sx={{ fontSize: "32px" }} />
                </button>
                <button
                    onClick={e => {e.stopPropagation(); dispatch(playPauseAction())}}
                    className="m-1 bg-transparent border-none outline-none text-white text-lg cursor-pointer"
                >
                    {
                        isPlaying ?
                            <PauseIcon sx={{ color: colors.orangeColor, fontSize: "32px" }} />
                            :
                            <PlayArrowIcon sx={{ color: colors.orangeColor, fontSize: "32px" }} />
                    }
                </button>
                <button
                    onClick={e => {e.stopPropagation(); dispatch(nextSongAction())}}
                    className="m-1 bg-transparent border-none outline-none text-white text-lg cursor-pointer">
                    <SkipNextIcon sx={{ fontSize: "32px" }} />
                </button>
            </div>
            <div className="items-center flex">
                <span className="mx-3 text-white">
                    {currentMinutes && currentMinutes < 10 ? "0" + currentMinutes : currentMinutes} :
                    {currentSeconds && currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}
                </span>
                <div
                    className={`${fullScreen ? "w-[70vw]" : "w-[30vw]"} h-[8px] cursor-pointer rounded-lg`}
                    style={{ background: colors.lightGray }}
                    ref={progress}
                    onClick={clickHandler}
                >
                    <div
                        className="w-[50%] h-full relative rounded-lg audio-progress-inner"
                        style={{ background: colors.orangeColor }}
                        ref={progressInner}
                    ></div>
                </div>
                <span className="mx-3 text-white">
                    {durationMinutes && durationMinutes < 10 ? "0" + durationMinutes : durationMinutes} :
                    {durationMinutes && durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}
                </span>
            </div>
        </div>
    )
}

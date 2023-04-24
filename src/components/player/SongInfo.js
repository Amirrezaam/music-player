import { useDispatch, useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import { nextSongAction, playPauseAction, prevSongAction } from '../../redux/music player/musicPlayerActions';
import colors from '../../_colors';

export default function SongInfo({ song, fullScreen }) {

    console.log("song => ", song);

    const state = useSelector(state => state.musicPlayer);
    const { isPlaying } = state;
    const dispatch = useDispatch();

    return (
        <div className={`flex w-full left-[10px] items-center ${fullScreen ? "flex-col text-center" : "absolute"}`}>

            <img
                className={`rounded-full ${fullScreen ? "w-[200px] h-[200px]" : "mr-3 w-[60px] h-[60px]"} ${isPlaying && "rotate-animate"}`}
                src={song?.share?.image}
            />
            <div>
                <h6 className={`text-white ${fullScreen && "mt-5 mb-2 text-2xl"}`}>{song?.title?.length > 18 ? song?.title.slice(0, 18) + "..." : song?.title}</h6>
                <span className="text-white md:hidden lg:inline">{song?.subtitle?.length > 30 ? song?.subtitle.slice(0, 30) + "..." : song?.subtitle}</span>
            </div>
            <div className={`absolute right-3 md:hidden ${fullScreen && "hidden"}`}>
                <button
                    onClick={e => { e.stopPropagation(); dispatch(prevSongAction()) }}
                    className="m-1 bg-transparent border-none outline-none text-white text-lg cursor-pointer"
                >
                    <SkipPreviousIcon sx={{ fontSize: "32px" }} />
                </button>
                <button
                    onClick={e => { e.stopPropagation(); dispatch(playPauseAction()) }}
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
                    onClick={e => { e.stopPropagation(); dispatch(nextSongAction()) }}
                    className="m-1 bg-transparent border-none outline-none text-white text-lg cursor-pointer">
                    <SkipNextIcon sx={{ fontSize: "32px" }} />
                </button>
            </div>
        </div>
    )
}

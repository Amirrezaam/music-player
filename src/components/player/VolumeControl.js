import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function VolumeControl({ volume, volumeHandler, fullScreen }) {
    return (
        <div onClick={e => e.stopPropagation()} className={`absolute right-[10px] flex-col ${fullScreen ? "bottom-3 flex" : "hidden md:flex"}`}>
            <span className="text-white">{(volume * 100).toFixed(0)} / 100</span>
            <div className="flex items-center">
                <VolumeUpIcon
                    className="text-white"
                />
                <input
                    type="range"
                    className="rounded-lg ml-2 overflow-hidden appearance-none bg-gray-400 h-4 w-128"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={volumeHandler}
                />
            </div>
        </div>
    )
}

import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../_colors';
import { closeNewPlaylistModalAction, createPlaylistAction } from '../../redux/playlist/playListActions';

export default function CreatePlaylistAlert() {

    const [playlistName, setPlaylistName] = useState("");
    const [error, setError] = useState("Invalid name !");
    const input = useRef(null);

    const state = useSelector(state => state.playlistReducer);
    const { listOfPlaylists, openNewPlaylistModal, openListOfPlaylists } = state;
    const dispatch = useDispatch();

    useEffect(() => {

        if (openNewPlaylistModal || openListOfPlaylists) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }

    }, [openNewPlaylistModal, openListOfPlaylists])

    const onChangeHandler = (value) => {

        setPlaylistName(value);

        const invalidName = listOfPlaylists.find(item => item.name.trim() === value.trim())

        if (!value.length || !value.trim().length) {
            setError("Invalid name !");
            input.current.focus();
        } else if (invalidName) {
            setError("This name is exist already !");
        }
        else {
            setError("");
        }
    }

    const closeNewPlaylist = () => {
        dispatch(closeNewPlaylistModalAction());
        setPlaylistName("");
        setError("Invalid name !");
    }

    const createPlaylist = () => {
        if (!error.length) {
            dispatch(createPlaylistAction(playlistName));
            dispatch(closeNewPlaylistModalAction());
            setPlaylistName("");
            setError("Invalid name !");
        }
    }

    return (
        <div
            className={`absolute transition-all left-0 flex items-center justify-center h-[100vh] w-full bg-black bg-opacity-70 ${openNewPlaylistModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ zIndex: 99999999999, top: window.scrollY }}
            onClick={closeNewPlaylist}
        >
            <div
                onClick={e => { e.stopPropagation() }}
                className="py-3 px-4 lg:w-[30%] w-[80%] rounded-md"
                style={{ background: colors.lightGray }}
            >
                <p className="text-white text-lg">Please select a name</p>
                <input
                    ref={input}
                    type="text"
                    className="w-full text-white rounded-lg pl-2 py-2 outline-none mt-10 border-b border-solid border-white bg-transparent"
                    placeholder="Name"
                    value={playlistName}
                    onChange={e => onChangeHandler(e.target.value)}
                />
                <span className="text-red-600">{error}</span>

                <div className="text-right mt-10">
                    <button
                        className="text-white"
                        onClick={closeNewPlaylist}
                    >
                        Cancel
                    </button>
                    <button
                        className="ml-8 border border-solid border-orange-600 py-2 px-4 rounded-md bg-orange-600 transition-all"
                        style={{ color: colors.white }}
                        onClick={createPlaylist}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

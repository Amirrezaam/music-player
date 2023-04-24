import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePlaylistAction, removeSongAction } from '../../redux/playlist/playListActions';
import colors from '../../_colors'

export default function DeleteModal({ openDeleteModal, setOpenDeleteModal, song, setSong, playlist }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (!openDeleteModal) {
            document.body.style.overflowY = "auto"
            if (song) {
                setSong(null);
            }
        } else {
            document.body.style.overflowY = "hidden"
        }

    }, [openDeleteModal])

    const deleteHandler = () => {
        if (song) {
            setSong(null)
            dispatch(removeSongAction(playlist.name, song));
        }
        else{
            dispatch(removePlaylistAction(playlist?.name));
            navigate("/")
        }
        setOpenDeleteModal(false);
    }

    return (
        <div
            className={`absolute transition-all left-0 flex items-center justify-center h-[100vh] w-full bg-black bg-opacity-70 ${openDeleteModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ zIndex: 99999999999, top: window.scrollY }}
            onClick={() => setOpenDeleteModal(false)}
        >
            <div
                onClick={e => { e.stopPropagation() }}
                className="py-3 px-4 w-[80%] lg:w-[30%] rounded-md"
                style={{ background: colors.lightGray }}
            >
                {
                    song ?
                        <h3 className="text-white text-lg">Are you sure about delete <span className="font-bold" style={{ color: colors.orangeColor }}>{song?.title}</span> from <span className="font-bold" style={{ color: colors.orangeColor }}>{playlist?.name}</span> ?</h3>
                        :
                        <h3 className="text-white text-lg">
                            Are you sure about delete <span className="font-bold" style={{ color: colors.orangeColor }}>{playlist?.name}</span> ?
                        </h3>
                }

                <div className="text-right mt-8">
                    <button
                        className="text-white"
                        onClick={() => setOpenDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="ml-8 text-white rounded-md px-4 py-2"
                        style={{ background: colors.orangeColor }}
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

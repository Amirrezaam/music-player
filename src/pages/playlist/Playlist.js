import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import TopChartCard from '../../components/topChartCard/TopChartCard';
import { useEffect, useState } from 'react';
import colors from '../../_colors';
import DeleteModal from '../../components/deleteModal/DeleteModal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Playlist() {

    const { playlistName } = useParams();

    const state = useSelector(state => state.playlistReducer);
    const { listOfPlaylists } = state;

    const playlist = listOfPlaylists?.find(item => item.name === playlistName);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [song, setSong] = useState(null);


    const openDeleteModalHandler = (e, song) => {
        e.stopPropagation();
        setOpenDeleteModal(true);
        setSong(song);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="container-box">
                {
                    playlist ?

                        <>
                            <div className="text-white flex items-center justify-between">
                                <h2 className="text-xl">
                                    <PlaylistPlayIcon /> {playlist?.name}
                                </h2>
                                <button
                                    onClick={() => setOpenDeleteModal(true)}
                                    className="border border-solid px-3 py-1 rounded-md"
                                    style={{ borderColor: colors.orangeColor }}
                                >
                                    Delete {playlist?.name}
                                </button>
                            </div>
                            <div>
                                {
                                    playlist.tracks.length ?
                                        playlist.tracks.map((item, i) =>
                                            <TopChartCard
                                                key={item.key}
                                                song={item}
                                                i={i}
                                                tracksList={playlist.tracks}
                                                openDeleteModalHandler={openDeleteModalHandler}
                                                deleteIcon
                                            />)
                                        :
                                        <p className="text-xl text-white mt-4">
                                            There is no music. <Link className="underline" to="/">Go to songs</Link> and add music.
                                        </p>
                                }

                            </div>
                        </>
                        :
                        <div>
                            <p className="text-xl text-white mb-6">
                                Can not find <span style={{ color: colors.orangeColor }}>{playlistName}</span> playlist !!!!
                            </p>
                            <Link className="text-white underline" to="/">
                                Go to songs <ArrowForwardIcon />
                            </Link>
                        </div>
                }
            </div>

            <DeleteModal
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                song={song}
                setSong={setSong}
                playlist={playlist}
            />

        </>
    )
}

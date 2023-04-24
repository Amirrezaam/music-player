import { useEffect, useState } from 'react';
import colors from '../../../../_colors'
import { getTopChartTracks } from '../../../../services/api';
import TopChartCard from '../../../../components/topChartCard/TopChartCard';
import Loader from '../../../../components/loader/Loader';
import ReplayIcon from '@mui/icons-material/Replay';

const initState = {
    tracks: null,
    error: false,
    loading: true,
}

export default function TopChart() {

    const [state, setState] = useState(initState);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setState(prevState => {
                return {
                    ...prevState,
                    loading: true
                }
            })
            getTopChartTracks().then(res => {
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
// 

    }, [refresh])

    return (
        <>
            <div className="lg:mt-14 mb-[90px]">
                <h3 className="text-2xl" style={{ color: colors.white }}>Top Chart</h3>
                {
                    state.loading ?
                        <Loader className="mt-4" />
                        : state.error ?
                            <div className="text-center">
                                <button
                                    onClick={() => setRefresh(prev => !prev)}
                                    className="mt-2 border border-solid border-white rounded-full p-2">
                                    <ReplayIcon sx={{ color: colors.orangeColor }} />
                                </button>
                            </div>
                            :
                            state.tracks?.map((item, i) =>
                                <TopChartCard
                                    key={item.key}
                                    i={i}
                                    song={item}
                                    tracksList={state.tracks}
                                />
                            )
                }
            </div>
        </>
    )
}

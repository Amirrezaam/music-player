import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import TopChartCard from '../../components/topChartCard/TopChartCard';
import { getSearchQuery } from '../../services/api';
import ReplayIcon from '@mui/icons-material/Replay';
import colors from '../../_colors';

export default function SearchPage() {

    const [state, setState] = useState({
        data: [],
        error: false,
        loading: true,
    })
    const [refresh, setRefresh] = useState(false);
    const [invalidQuery, setInvalidQuery] = useState(false);

    const params = useParams();

    const { query } = params;

    useEffect(() => {

        const fetchData = () => {
            setState(prevState => {
                return {
                    ...prevState,
                    loading: true,
                }
            })

            getSearchQuery(query).then(res => {
                setState(prevState => {
                    return {
                        ...prevState,
                        data: res?.tracks?.hits,
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

        if (query.trim().length < 2) {
            setInvalidQuery(true);
        } else {
            setInvalidQuery(false);
            fetchData();
        }

    }, [query, refresh])

    if (invalidQuery) {
        return <div className="container-box">
            <h1 className="text-white text-2xl">Result for "{query}"</h1>
            <p className="text-red-600 my-4">Invalid value !</p>
            <p className="text-white">The value you entered must be at least 2 characters.</p>
        </div>
    }

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
                            <h1 className="text-white text-2xl">Result for "{query}"</h1>
                            {
                                state.data.map((track, i) =>
                                    <TopChartCard
                                        tracksList={state.data}
                                        song={track.track}
                                        i={i}
                                    />
                                )
                            }
                        </div>
            }
        </div>
    )
}

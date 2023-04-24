import colors from "../../_colors";
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TopChartCard from '../../components/topChartCard/TopChartCard';
import { Link } from "react-router-dom";

export default function Favorite() {

    const favoriteState = useSelector(state => state.favoriteReducer);
    const { tracks } = favoriteState;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="container-box">
                <h3
                    className="text-2xl"
                    style={{ color: colors.white }}
                >
                    Favorites
                </h3>
                <div className="mb-[90px]">
                    {
                        tracks.length ?
                            tracks.map((item, i) =>
                                <TopChartCard
                                    key={item.key}
                                    song={item}
                                    i={i}
                                    tracksList={tracks}
                                />
                            )
                            :
                            <p className="text-xl text-white mt-4">
                                There is no music. <Link className="underline" to="/">Go to songs</Link> and add music.
                            </p>
                    }
                </div>
            </div>

        </>
    )
}

import RecommendCard from './components/recommendCard/RecommendCard'
import TopChart from './components/topChart/TopChart'

export default function Home() {
    return (
        <div className="container-box">
            <RecommendCard />
            <TopChart />
        </div>
    )
}

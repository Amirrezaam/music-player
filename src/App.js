import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreatePlaylistAlert from './components/createPlaylistAlert/CreatePlaylistAlert';
import Header from './components/header/Header';
import LatestTracks from './components/latestTracks/LatestTracks';
import ListsOfPlaylists from './components/listsOfPlaylists/ListsOfPlaylists';
import MusicPlayer from './components/player/MusicPlayer';
import SideBar from './components/sideBar/SideBar';
import Favorite from './pages/favorite/Favorite';
import Home from './pages/home/Home';
import Playlist from './pages/playlist/Playlist';
import SearchPage from './pages/search page/SearchPage';
import SongDetails from './pages/song detail/SongDetails';
import store from './redux/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <Header />
        <SideBar />
        <LatestTracks />
        <Routes>
          <Route path="/search/query=:query" element={<SearchPage />} />
          <Route path="/song_details/:songId" element={<SongDetails />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/playlist/query=:playlistName" element={<Playlist />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ListsOfPlaylists />
        <CreatePlaylistAlert />
        <MusicPlayer />
      </Provider>
    </>
  );
}

export default App;
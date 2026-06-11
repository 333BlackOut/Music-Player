import Aside from "./Aside";
import Main from "./Main";
import "./Dashboard.css";
import type { Song, Album } from "../data/types";
import AlbumView from "./AlbumView";
import AllAlbums from "./AllAlbums";
import AllSongs from "./AllSongs";
import SearchView from "./SearchView";
import type { SongMetadata } from "../data/metadata";
import Favourites from "./Favourites";

type DashboardProps = {
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
  selectedAlbum: Album | null;
  songs: Song[];
  albums: Album[];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
  metadata: Record<string, SongMetadata>;
};

const Dashboard = ({
  setCurrentSong,
  setSelectedAlbum,
  selectedAlbum,
  songs,
  albums,
  view,
  setView,
  searchItem,
  metadata,
}: DashboardProps) => {
  if (searchItem.trim()) {
    return (
      <div className="dashboard">
        <Aside setView={setView} />
        <SearchView
          searchItem={searchItem}
          songs={songs}
          albums={albums}
          setCurrentSong={setCurrentSong}
          setSelectedAlbum={setSelectedAlbum}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Aside setView={setView} />
      {selectedAlbum ? (
        <AlbumView album={selectedAlbum} setCurrentSong={setCurrentSong} />
      ) : view === "albums" ? (
        <AllAlbums albums={albums} setSelectedAlbum={setSelectedAlbum} />
      ) : view === "songs" ? (
        <AllSongs songs={songs} setCurrentSong={setCurrentSong} />
      ) : view === "favourites" ? (
        <Favourites
          songs={songs}
          metadata={metadata}
          setCurrentSong={setCurrentSong}
        />
      ) : (
        <Main
          setCurrentSong={setCurrentSong}
          setSelectedAlbum={setSelectedAlbum}
          songs={songs}
          albums={albums}
          setView={setView}
          metadata={metadata}
        />
      )}
    </div>
  );
};

export default Dashboard;

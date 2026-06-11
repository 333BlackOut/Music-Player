import type { Song, Album } from "../data/types";
import "./AlbumView.css";
import SongRow from "./SongRow";

type AlbumViewProps = {
  album: Album;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
};

const AlbumView = ({ album, setCurrentSong }: AlbumViewProps) => {
  return (
    <div className="albumView">
      <div className="album-header">
        <img src={album.cover} alt="cover" />
        <div className="album-info">
          <h2>{album.title}</h2>
          <p>
            {album.artist} - {album.songs.length} Songs
          </p>
        </div>
      </div>
      <div className="album-songs">
        {album.songs.map((song) => (
          <SongRow key={song.id} song={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  );
};

export default AlbumView;

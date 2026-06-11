import "./AlbumCards.css";
import type { Album } from "../data/types";

type AlbumProps = {
  album: Album;
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
};

const AlbumCards = ({ album, setSelectedAlbum }: AlbumProps) => {
  return (
    <div
      className="album-cards"
      onClick={() => {
        setSelectedAlbum(album);
      }}
    >
      <img src={album.cover} alt="cover" />
      <div className="song-info">
        <h4>{album.title}</h4>
        <p>{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCards;

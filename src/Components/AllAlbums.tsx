import AlbumCards from "./AlbumCards";
import type { Album } from "../data/types";
import "./AllAlbums.css";

type AllAlbumsProps = {
  albums: Album[];
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
};

const AllAlbums = ({ albums, setSelectedAlbum }: AllAlbumsProps) => {
  return (
    <div className="allAlbums">
      <h2>All Albums</h2>
      <div className="all-albums">
        {albums.map((album) => (
          <AlbumCards
            key={album.id}
            album={album}
            setSelectedAlbum={setSelectedAlbum}
          />
        ))}
      </div>
    </div>
  );
};

export default AllAlbums;

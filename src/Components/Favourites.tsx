import type { SongMetadata } from "../data/metadata";
import type { Song } from "../data/types";
import "./AllSongs.css";
import SongRow from "./SongRow";
import "./Favourites.css";
import { useMemo } from "react";

type FavouritesProps = {
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  metadata: Record<string, SongMetadata>;
};

const Favourites = ({ songs, setCurrentSong, metadata }: FavouritesProps) => {
  const favouriteSongs = useMemo(() => {
    return songs.filter((song) => metadata[song.id]?.liked);
  }, [songs, metadata]);

  if (favouriteSongs.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Favourite Songs</h2>
        <p>No Favourite Songs Yet</p>
      </div>
    );
  }

  return (
    <div className="favourites">
      <h2>Favourite Songs</h2>
      <div className="song-header">
        <p>Cover</p>
        <p>Title</p>
        <p>Artist</p>
      </div>
      <div className="all-songs">
        {favouriteSongs.map((song) => (
          <SongRow key={song.id} song={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;

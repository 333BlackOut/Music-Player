import type { Song } from "../data/types";
import "./AllSongs.css";
import SongRow from "./SongRow";

type AllSongsProps = {
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
};

const AllSongs = ({ songs, setCurrentSong }: AllSongsProps) => {
  return (
    <div className="allSongs">
      <h2>All Songs</h2>
      <div className="song-header">
        <p>Cover</p>
        <p>Title</p>
        <p>Artist</p>
      </div>
      <div className="all-songs">
        {songs.map((song) => (
          <SongRow key={song.id} song={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  );
};

export default AllSongs;

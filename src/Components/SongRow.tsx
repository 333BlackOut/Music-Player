import type React from "react";
import type { Song } from "../data/types";
import "./SongRow.css";

type SongRowProps = {
  song: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
};

const SongRow = ({ song, setCurrentSong }: SongRowProps) => {
  return (
    <div className="songRow" onClick={() => setCurrentSong(song)}>
      <img src={song.cover} alt={song.title} />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
    </div>
  );
};

export default SongRow;

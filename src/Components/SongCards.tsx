import "./SongCards.css";
import type { Song } from "../data/types";

type CardProps = {
  song: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
};

const SongCards = ({ song, setCurrentSong }: CardProps) => {
  return (
    <div
      className="song-cards hover-color"
      onClick={() => setCurrentSong(song)}
    >
      <img src={song.cover} alt="cover" />
      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCards;

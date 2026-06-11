import SongCards from "./SongCards";
import AlbumCards from "./AlbumCards";
import "./Main.css";
import type { Song, Album } from "../data/types";
import open from "../assets/arrow-right-lined.svg";
import type React from "react";
import type { SongMetadata } from "../data/metadata";
import { useMemo } from "react";

type MainProps = {
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
  songs: Song[];
  albums: Album[];
  metadata: Record<string, SongMetadata>;
};

const Main = ({
  setCurrentSong,
  setSelectedAlbum,
  songs,
  albums,
  setView,
  metadata,
}: MainProps) => {
  const discoverAlbums = useMemo(() => {
    return [...albums].sort(() => Math.random() - 0.5).slice(0, 7);
  }, [albums]);

  return (
    <div className="main">
      <section className="recent">
        <div
          className="section-title hover-color"
          onClick={() => setView("songs")}
        >
          <h2>Recent</h2>
          <img src={open} alt="open" />
        </div>
        <div className="recent-cards">
          {[...songs]
            .sort(
              (a, b) =>
                (metadata[b.id]?.lastPlayed ?? 0) -
                (metadata[a.id]?.lastPlayed ?? 0),
            )
            .slice(0, 7)
            .map((song) => (
              <SongCards
                key={song.id}
                song={song}
                setCurrentSong={setCurrentSong}
              />
            ))}
        </div>
      </section>
      <section className="trending">
        <div
          className="section-title hover-color"
          onClick={() => setView("songs")}
        >
          <h2>Trending</h2>
          <img src={open} alt="open" />
        </div>
        <div className="trending-cards">
          {[...songs]
            .sort(
              (a, b) =>
                (metadata[b.id]?.playCount ?? 0) -
                (metadata[a.id]?.playCount ?? 0),
            )
            .slice(0, 7)
            .map((song) => (
              <SongCards
                key={song.id}
                song={song}
                setCurrentSong={setCurrentSong}
              />
            ))}
        </div>
      </section>
      <section className="discover">
        <div
          className="section-title hover-color"
          onClick={() => setView("albums")}
        >
          <h2>Discover Albums</h2>
          <img src={open} alt="open" />
        </div>
        <div className="discover-cards">
          {discoverAlbums.map((album) => (
            <AlbumCards
              key={album.id}
              album={album}
              setSelectedAlbum={setSelectedAlbum}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;

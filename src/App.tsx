import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import Player from "./Components/Player";
import "./App.css";
import { useState } from "react";
import type { Song, Album } from "./data/types";
import { loadLibrary } from "./data/loadLibrary";
import { loadMetadata, saveMetaData, type SongMetadata } from "./data/metadata";

const App = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [view, setView] = useState("home");
  const { songs, albums } = loadLibrary();
  const [searchItem, setSearchItem] = useState("");
  const [metadata, setMetadata] =
    useState<Record<string, SongMetadata>>(loadMetadata());
  const updateSongMetadata = (
    songId: string,
    updates: Partial<SongMetadata>,
  ) => {
    setMetadata((prev) => {
      const updatedMetadata = {
        ...prev,
        [songId]: {
          liked: prev[songId]?.liked ?? false,
          playCount: prev[songId]?.playCount ?? 0,
          lastPlayed: prev[songId]?.lastPlayed ?? null,
          ...updates,
        },
      };
      saveMetaData(updatedMetadata);
      return updatedMetadata;
    });
  };
  const toggleLike = (songId: string) => {
    updateSongMetadata(songId, { liked: !metadata[songId]?.liked });
  };
  const increasePlayCount = (songId: string) => {
    updateSongMetadata(songId, {
      playCount: (metadata[songId]?.playCount ?? 0) + 1,
    });
    console.log("playCount", metadata);
  };
  const lastPlayed = (songId: string) => {
    updateSongMetadata(songId, {
      lastPlayed: Date.now(),
    });
    console.log("lastPlayed", metadata);
  };

  return (
    <div className="app">
      <Header
        setSelectedAlbum={setSelectedAlbum}
        setView={setView}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
      <Dashboard
        setCurrentSong={setCurrentSong}
        setSelectedAlbum={setSelectedAlbum}
        selectedAlbum={selectedAlbum}
        songs={songs}
        albums={albums}
        view={view}
        setView={setView}
        searchItem={searchItem}
        metadata={metadata}
      />
      <Player
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        songs={songs}
        metadata={metadata}
        toggleLike={toggleLike}
        increasePlayCount={increasePlayCount}
        lastPlayed={lastPlayed}
      />
    </div>
  );
};

export default App;

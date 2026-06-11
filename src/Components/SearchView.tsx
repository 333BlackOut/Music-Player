import React, { useMemo } from "react";
import type { Album, Song } from "../data/types";
import AlbumCards from "./AlbumCards";
import SongRow from "./SongRow";
import "./SearchView.css";

type SearchViewProps = {
  searchItem: string;
  songs: Song[];
  albums: Album[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
};

const SearchView = ({
  searchItem,
  songs,
  albums,
  setCurrentSong,
  setSelectedAlbum,
}: SearchViewProps) => {
  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [songs, searchItem]);
  const filteredAlbums = useMemo(() => {
    return albums.filter(
      (album) =>
        album.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [albums, searchItem]);
  return (
    <div className="searchView">
      <section className="searchAlbums">
        <h2>Albums</h2>
        <div className="search-albums">
          {filteredAlbums.map((album) => (
            <AlbumCards
              key={album.id}
              album={album}
              setSelectedAlbum={setSelectedAlbum}
            />
          ))}
        </div>
      </section>
      <section className="searchSongs">
        <h2>Songs</h2>
        <div className="song-header">
          <p>Cover</p>
          <p>Title</p>
          <p>Artist</p>
        </div>
        <div className="search-songs">
          {filteredSongs.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              setCurrentSong={setCurrentSong}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchView;

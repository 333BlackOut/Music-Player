export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  src: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  songs: Song[];
};
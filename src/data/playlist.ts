import type { Song } from "./types";

export type Playlist = {
  id: number;
  name: string;
  songs: Song[];
};
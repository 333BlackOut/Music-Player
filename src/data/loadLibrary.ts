import type {Song, Album} from './types'

export const loadLibrary = () => {
    const songFiles = import.meta.glob("../Songs/**/*.mp3", {eager: true, import: "default", query: "url"}) as Record<string, string>;
    const coverFiles = import.meta.glob("../Songs/**/AlbumImage.*", {eager: true, import: "default", query: "url"}) as Record<string, string>;
    const songs: Song[] = [];

    Object.keys(songFiles).forEach(path => {
        
        const parts = path.split("/")
        const folderName = parts[2];
        const fileName = parts[3];
        const songName = fileName.replace(".mp3", "");
        const [album, artist] = folderName.split("-");
        const cover = Object.entries(coverFiles).find(([path]) => path.includes(folderName))?.[1] || "";
        const songUrl = songFiles[path];
        
        const song: Song = {
            id: `${folderName}/${songName}`,
            title: songName,
            artist,
            album,
            src: songUrl,
            cover: cover,
        }

        songs.push(song);
    })

    const albumMap = new Map<string, Album>();

    songs.forEach(song => {
        if(!albumMap.has(song.album)){
            albumMap.set(song.album, {
                id: `${song.album}/${song.artist}`,
                title: song.album,
                artist: song.artist,
                cover: song.cover,
                songs: [],
            })

        }
        albumMap.get(song.album)?.songs.push(song);
    })
    
    const albums = Array.from(albumMap.values());

    return{
        songs,
        albums,
    }
}

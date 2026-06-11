export type SongMetadata = {
    liked: boolean;
    playCount: number;
    lastPlayed: number | null;
}

export const loadMetadata = (): Record<string, SongMetadata> => {
    const saved = localStorage.getItem("music-player-metadata");

    if(!saved){
        return{}
    }
    return JSON.parse(saved);
}

export const saveMetaData = (metadata: Record<string, SongMetadata>) => {
    localStorage.setItem("music-player-metadata", JSON.stringify(metadata));
}
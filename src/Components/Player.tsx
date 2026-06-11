import "./Player.css";
import previous from "../assets/arrow-left.svg";
import next from "../assets/arrow-right.svg";
import play from "../assets/play-button-filled-1.svg";
import pause from "../assets/pause-2.svg";
import likedIcon from "../assets/heart-like-filled.svg";
import shuffleIcon from "../assets/shuffle-icon.svg";
import notLikedIcon from "../assets/heart-like-notfilled.svg";
import type { Song } from "../data/types";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { SongMetadata } from "../data/metadata";

type PlayerProps = {
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  currentSong: Song | null;
  songs: Song[];
  metadata: Record<string, SongMetadata>;
  toggleLike: (songId: string) => void;
  increasePlayCount: (songId: string) => void;
  lastPlayed: (songId: string) => void;
};

const Player = ({
  setCurrentSong,
  currentSong,
  songs,
  metadata,
  toggleLike,
  increasePlayCount,
  lastPlayed,
}: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  const isLiked = currentSong && metadata[currentSong.id]?.liked;

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
    audioRef.current.src = currentSong.src;
    audioRef.current.play();
    increasePlayCount(currentSong.id);
    lastPlayed(currentSong.id);
    setIsPlaying(true);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.addEventListener("ended", nextSong);

    return () => {
      audio.removeEventListener("ended", nextSong);
    };
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const loadDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadDuration);
    };
  }, []);

  const songIndex = songs.findIndex((song) => song.id === currentSong?.id);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (songIndex === -1) return;

    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === songIndex);
      setCurrentSong(songs[randomIndex]);
    } else {
      const nextIndex = (songIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  const previousSong = () => {
    if (songIndex === -1) return;

    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === songIndex);
      setCurrentSong(songs[randomIndex]);
    } else {
      const previousIndex = (songIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);

    if (!audioRef.current) return;

    audioRef.current.volume = newVolume / 100;

    setVolume(newVolume);
  };

  return (
    <div className="player">
      <section className="controls">
        <div className="info-controls">
          <div className="info">
            <div className="like-shuffle">
              <button onClick={() => setShuffle(!shuffle)}>
                <img
                  src={shuffleIcon}
                  alt=""
                  className={shuffle ? "shuffle-active" : "shuffle-inactive"}
                />
              </button>
              <button
                onClick={() => {
                  if (currentSong) {
                    toggleLike(currentSong.id);
                  }
                }}
              >
                {isLiked ? (
                  <img src={likedIcon} alt="liked" />
                ) : (
                  <img src={notLikedIcon} alt="notliked" />
                )}
              </button>
            </div>
            <p>
              {currentSong?.title || "Play a Song"} -{currentSong?.artist || ""}
            </p>
          </div>
          <div className="control-buttons">
            <div className="previous-btn" onClick={previousSong}>
              <img src={previous} alt="" />
            </div>
            <div className="play-btn" onClick={togglePlay}>
              <img src={isPlaying ? pause : play} alt="" />
            </div>
            <div className="next-btn" onClick={nextSong}>
              <img src={next} alt="" />
            </div>
          </div>
          <div className="vol-time">
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolume}
              className="volume"
            />
            <div className="time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
        <div className="control-playbar">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="playbar"
          />
        </div>
        <audio ref={audioRef} />
      </section>
    </div>
  );
};

export default Player;

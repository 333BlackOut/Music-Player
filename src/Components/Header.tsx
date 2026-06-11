import "./Header.css";
import home from "../assets/home-house-notfilled-3.svg";
import search from "../assets/search-lens-icon.svg";
import type React from "react";
import type { Album } from "../data/types";
import { useState } from "react";

type HeaderProps = {
  setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({
  setSelectedAlbum,
  setView,
  searchItem,
  setSearchItem,
}: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="header">
      <h1 className={`music-logo ${showSearch ? "hidden" : ""}`}>
        Music Player
      </h1>
      <div className="navigate">
        <input
          type="text"
          placeholder="What's Your Vibe Today"
          className={`search ${showSearch ? "open" : ""}`}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <img
          src={search}
          alt="search"
          className="search-icon"
          onClick={() => setShowSearch((prev) => !prev)}
        />
        <img
          src={home}
          alt="home"
          className="home-icon"
          onClick={() => {
            setSelectedAlbum(null);
            setView("home");
            setSearchItem("");
          }}
        />
      </div>
    </div>
  );
};

export default Header;

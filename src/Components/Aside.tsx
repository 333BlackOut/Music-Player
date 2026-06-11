import "./Aside.css";
import userProfile from "../assets/user-profile-1.svg";
import menuIcon from "../assets/menu-hamburger-line-styled.svg";
import { useState } from "react";

type AsideProps = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const Aside = ({ setView }: AsideProps) => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  return (
    <div className={`aside ${showMenu ? "open" : ""}`}>
      <img
        src={menuIcon}
        alt=""
        className="menu-icon"
        onClick={() => setShowMenu((prev) => !prev)}
      />
      <section className={`aside-menu ${showMenu ? "open" : ""}`}>
        <div className="user-account">
          <img src={userProfile} alt="user" />
          <p>User</p>
        </div>
        <div className="user-lists">
          <h3 onClick={() => setView("favourites")} className="hover-color">
            Favourites
          </h3>
          <h3 onClick={() => setView("albums")} className="hover-color">
            Playlists
          </h3>
        </div>
        <div className="contact-aside">
          <a
            href="https://www.linkedin.com/in/siddharth-soni-471430215/"
            className="hover-color"
          >
            LinkedIn
          </a>
          <a href="https://github.com/333BlackOut" className="hover-color">
            Github
          </a>
        </div>
      </section>
    </div>
  );
};

export default Aside;

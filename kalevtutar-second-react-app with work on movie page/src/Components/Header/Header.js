//get props passed in and then have ternary statement - if this is the movie page (if prop of "title" === "My Movies"), have the link in upper right be to the profile page, else to the movie page.   Also, use the props to see which title should be displayed//

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";


function Header(props) {
  return (
    <div className="header">
      {props.title === "Movies" ?
        <div className="navbar-movies">
          <h1 className="header-top">LOGO</h1>
          <Link className="logo-link" to="/Profile">
            <button className="navbar-button">
              Profile
            </button>
          </Link>
        </div> :
        <div className="navbar">
          <Link className="logo-link" to="/">
            <h1 className="header-top">LOGO</h1>
          </Link>
        </div> 
      }
      {props.title === "Movies" ?
        <h1>Your Movies</h1> :
        <h1>Profile</h1>
      }
    </div>
  );
}

export default Header;
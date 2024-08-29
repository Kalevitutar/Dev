import React from "react";
import { Link } from "react-router-dom";
import facebookc from "../../Assets/facebookc.png";
import twitterc from "../../Assets/twitterc.png";
import instagramc from "../../Assets/instagramc.png";
import "./Footer.css";


function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-above-line">
        <div className="logo">
          <h2 className="brown">LOGO</h2>
          <h3 className="blue">+1 (245) 678-9012</h3>
          <h4 className="blue">support@kinos&#245;prus.ee</h4>
        </div>
        <div className="menu">
          <h3 className="brown">MENU</h3>
          <nav>
            {props.title === "Profile" ?
              <div className="movies-option">
                <Link className="footer-link" to="/">
                  <h4 className="blue">My Movies</h4>
                </Link>
              </div> :
              <div>
                <Link className="footer-link" to="/Profile">
                  <h4 className="blue">Profile</h4>
                </Link>
              </div>}
          </nav>
        </div>
      </div>
      <hr className="footer-line"></hr>
      <div className="social">
        <a href="https://www.facebook.com/kinosoprus" target="_blank" rel="noopener noreferrer" >
          <img src={facebookc} alt="facebook link" className="social-media-links" />
        </a>
        <a href="https://twitter.com/kinosoprus" target="_blank" rel="noopener noreferrer">
          <img src={twitterc} alt="twitter link" className="social-media-links" />
          </a>
        <a href="https://www.instagram.com/kino_soprus/?hl=en" target="_blank" rel="noopener noreferrer">
          <img src={instagramc} alt="instagram link" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
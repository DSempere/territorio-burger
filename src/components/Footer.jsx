import React from "react";
import "./Footer.css";
import insta from "../assets/images/insta.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sec_footer sec_padding">
        <div className="sec_footer-links">
          <div className="sec_footer-text">
            <h4>Horario</h4>
            <p>
              Estamos abiertos para comer en el local, desde 13:30 - 16:00 y por la noche, desde las 13:30 a 23:30 todos
              los días.
            </p>
          </div>
          <div className="sec_footer-links-div">
            <div className="socialmedia">
              <a href="https://www.instagram.com/territorioburger/">
                <img src={insta} alt="instagramLogo" />
              </a>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sec_footer-below">
          <div className="sec_footer-copyright">
            <p>@{new Date().getFullYear()} Territorio burger. All right reserved.</p>
          </div>
          <div className="sec_footer-below-links">
            <a href="/terms">
              <div>
                <p>Terminos y condiciones</p>
              </div>
            </a>
            <a href="/privacy">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/security">
              <div>
                <p>Security</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

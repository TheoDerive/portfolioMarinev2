import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hoverElement, unHoverElement } from "./Cursor";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <section className="links-footer">
        <ul className="link-footer-container">
          <h3 className="name-link-categorie">Pages :</h3>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Accueil</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Projets</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">À propos</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Contact</a>
          </li>
        </ul>
        <ul className="link-footer-container">
          <h3 className="name-link-categorie">Projets :</h3>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Illustrations</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Graphismes</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Photographies</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Autres</a>
          </li>
        </ul>
        <ul className="link-footer-container">
          <h3 className="name-link-categorie">A propos :</h3>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Qui je suis</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Ma vision</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="/">Ma carrière</a>
          </li>
        </ul>
      </section>

      <section className="social-container">
        <a href="/" className="image-container-footer">
          <img src="/assets/logoMarineBlack.svg" alt="Logo Marine Sicaud" />
        </a>
        <a
          href="mailto:sicaud.marine.pro@gmail.com"
          className="image-container-footer"
          onMouseEnter={() => hoverElement("links")}
          onMouseLeave={() => unHoverElement()}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a
          href="https://www.linkedin.com/in/marine-sicaud/"
          className="image-container-footer"
          onMouseEnter={() => hoverElement("links")}
          onMouseLeave={() => unHoverElement()}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </section>
    </footer>
  );
}

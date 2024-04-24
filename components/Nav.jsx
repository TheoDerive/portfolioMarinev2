"use client";

import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export default function Nav() {
  const [isDynamique, setIsDynamique] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);

    const navElement = document.querySelector(".nav-classic");
    const competencesContainer = document.querySelector("#competences");
    let checkout = false;

    function scrollNav() {
      const offsetTop = competencesContainer.offsetTop;
      let pourcentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;

      if (pourcentage > -10) {
        checkout = true;

        navElement.classList.add("nav-classic-scroll");
        setIsDynamique(false);
      } else {
        navElement.classList.remove("nav-classic-scroll");
        setIsDynamique(true);
      }
    }

    window.addEventListener("scroll", scrollNav);

    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  });

  return (
    <nav className="nav-classic">
      <div></div>
      <section
        className={
          isDynamique && windowWidth >= 768 ? "dynamique-island" : "normal-nav"
        }
      >
        <a
          href="/"
          onMouseEnter={() => hoverElement("links")}
          onMouseLeave={() => unHoverElement()}
          className="nav-classic-image"
        >
          <img src="/assets/logoMarineBlack.svg" alt="logo Marine" />
        </a>

        <ul
          className={`nav-classic-onglet-container ${
            isOpen ? "nav-classic-onglet-container-open" : null
          }`}
        >
          {windowWidth <= 768 ? (
            <span
              className="close-black"
              style={{ left: "unset", right: "30px" }}
              onClick={() => setIsOpen(false)}
            ></span>
          ) : null}
          <li
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
            className="nav-classic-onglet"
          >
            <a href="/">Acceuil</a>
          </li>
          <li
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
            className="nav-classic-onglet"
          >
            <a href="/projets">Projets</a>
          </li>
          <li
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
            className="nav-classic-onglet"
          >
            <a href="https://www.linkedin.com/in/marine-sicaud/">A propos</a>
          </li>
        </ul>
      </section>

      {windowWidth <= 768 ? (
        <span
          className="burger"
          style={{ left: "unset", right: "30px" }}
          onClick={() => setIsOpen(true)}
        ></span>
      ) : (
        <a
          href="mailto:sicaud.marine.pro@gmail.com"
          className="nav-classic-button"
          onMouseEnter={() => hoverElement("buttons")}
          onMouseLeave={() => unHoverElement()}
        >
          Contact
        </a>
      )}
    </nav>
  );
}

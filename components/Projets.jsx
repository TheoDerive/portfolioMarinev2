"use client";

import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export function ProjetsSlider({ projetsArray, handleProjet = null }) {
  // Get scroll position
  React.useEffect(() => {
    function transform(section) {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(".scroll-projets");
      let pourcentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      pourcentage < 0
        ? 0
        : pourcentage > (projetsArray.length - 1) * 100 + 20
          ? (projetsArray.length - 1) * 100 + 20
          : pourcentage;
      scrollSection.style.transform = `translate3d(${-pourcentage}vw, 0, 0)`;
    }

    function handleScroll() {
      const stickySection = document.querySelector(".projets");

      transform(stickySection);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [projetsArray]);

  return (
    <section
      id="projets"
      className="projets-container"
      style={{ height: `${projetsArray.length * 100 + 50}vh` }}
    >
      <div className="projets">
        <div
          className="scroll-projets"
          style={{ width: `${projetsArray.length * 100}vw` }}
        >
          {projetsArray.map((projet) => (
            <article
              className="projet"
              onMouseEnter={() => hoverElement("links")}
              onMouseLeave={() => unHoverElement()}
              onClick={() =>
                handleProjet ? handleProjet(projet, window.scrollY) : null
              }
            >
              <img src={projet.projetImage} alt="image" />
              <span>
                {" "}
                <span className="barre"></span>
                {projet.projetName}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

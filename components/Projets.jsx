"use client";

import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export default function ProjetsSlider({ projetsArray, handleProjet = null }) {
  const [scrollY, setScrollY] = React.useState(0);
  const [windowWidth, setWindow] = React.useState();

  // Get scroll position
  React.useEffect(() => {
    setWindow(window.innerWidth);

    function transform(section) {
      if (section) {
        setScrollY(window.scrollY);
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
    }

    function handleScroll() {
      const stickySection = document.querySelector(".projets");

      transform(stickySection);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [projetsArray]);

  return (
    <section
      id="projets"
      className="projets-container"
      style={{
        height: `${
          windowWidth && windowWidth > 1000
            ? projetsArray.length * 70 + 20
            : projetsArray.length * 100 + 50
        }vh`,
      }}
    >
      <section className="projets">
        <div
          className="scroll-projets"
          style={{
            width: `${
              windowWidth && windowWidth > 1000
                ? projetsArray.length * 70
                : projetsArray.length * 100
            }vw`,
          }}
        >
          {projetsArray.map((projet) => (
            <article
              key={projet._id}
              className="projet"
              onMouseEnter={() => hoverElement("links")}
              onMouseLeave={() => unHoverElement()}
              onClick={() =>
                handleProjet ? handleProjet(projet, scrollY) : null
              }
            >
              <div
                style={{ backgroundImage: `url(${projet.projetImage[0]})` }}
              ></div>
              <span>
                {" "}
                <span className="barre"></span>
                {projet.projetName}
              </span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

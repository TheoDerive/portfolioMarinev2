"use client";

import React from "react";

import "../../style/style.scss";
import { hoverElement, unHoverElement } from "@/components/Cursor";
import { ProjetsSlider } from "@/components/Projets";

export default function Projets() {
  const [categorieSelect, setCategoriesSelect] = React.useState(null);
  const [projets, setProjets] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [scroll, setScroll] = React.useState(0);
  const [close, setClose] = React.useState({
    categorieSlider: false,
    projet: false,
  });

  const projetsSliderRef = React.useRef();

  React.useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";

    async function getAllCategories() {
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      setCategories(data);

      console.log(data);
    }
    getAllCategories();
  }, []);

  React.useEffect(() => {
    if (categorieSelect !== null) {
      setProjets(
        categories.find((categorie) => categorie.name === categorieSelect)
          .content,
      );
    }
  }, [categorieSelect]);

  return (
    <>
      <nav>
        <a
          href="/"
          onMouseEnter={() => hoverElement("texts")}
          onMouseLeave={() => unHoverElement()}
          className="close"
        ></a>

        <button
          className="next"
          onMouseEnter={() => hoverElement("texts")}
          onMouseLeave={() => unHoverElement()}
          onClick={() =>
            scroll === categories.length - 1
              ? setScroll(0)
              : setScroll((prev) => prev + 1)
          }
        ></button>
        <button
          className="prev"
          onMouseEnter={() => hoverElement("texts")}
          onMouseLeave={() => unHoverElement()}
          onClick={() =>
            scroll <= 0
              ? setScroll(categories.length - 1)
              : setScroll((prev) => prev - 1)
          }
        ></button>
      </nav>
      <main
        className="projects-page-section"
        style={{ width: `${categories.length * 100}vw` }}
      >
        <ul
          className="projects-page-container"
          onMouseEnter={() => hoverElement("buttons")}
          onMouseLeave={() => unHoverElement()}
          style={{ transform: `translateX(-${scroll * 100}vw)` }}
        >
          {categories.map((categorie) => (
            <article
              onClick={() => {
                setCategoriesSelect(categorie.name);
                document.querySelector("html").style.overflowY = "scroll";
                setTimeout(() => {
                  window.scrollTo(0, projetsSliderRef.current.offsetTop);
                }, 100);
                setTimeout(() => {
                  setClose((prev) => ({ ...prev, categorieSlider: true }));
                }, 1000);
              }}
              className="project-container"
            >
              <h2 className="categorie-name">
                <strong>{categorie.name}</strong>
              </h2>

              <section className="projects-show-container">
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
              </section>

              <section className="projects-show-container">
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
              </section>

              <section className="projects-show-container">
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
                {categorie.content.map((projet) => (
                  <article
                    className="projet-image-container"
                    style={{ backgroundImage: `url(${projet.projetImage})` }}
                  ></article>
                ))}
              </section>
            </article>
          ))}
        </ul>

        {projets.length > 0 && (
          <section className="slider-projets-section" ref={projetsSliderRef}>
            {close.categorieSlider && (
              <span
                className="close-projets-slider"
                onClick={() => {
                  setClose((prev) => ({ ...prev, categorieSlider: false }));
                  window.scrollTo(0, 0);
                  document.querySelector("html").style.overflow = "hidden";
                  setTimeout(() => {
                    setCategoriesSelect(null);
                  }, 500);
                }}
              ></span>
            )}
            <ProjetsSlider projetsArray={projets} />
          </section>
        )}
      </main>
    </>
  );
}


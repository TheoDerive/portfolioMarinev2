"use client";

import React, { Suspense, useEffect, useState } from "react";

import "../../style/style.scss";
import { hoverElement, unHoverElement } from "@/components/Cursor";
import { ProjetsSlider } from "@/components/Projets";

export default function Projets() {
  const [categorieSelect, setCategoriesSelect] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [projets, setProjets] = React.useState([]);
  const [projetSelect, setProjetSelect] = useState(null);
  const [scrollCategories, setScrollCategories] = React.useState(0);
  const [scroll, setScroll] = React.useState(0);
  const [close, setClose] = React.useState({
    categorieSlider: false,
    projet: false,
  });

  const projetsSliderRef = React.useRef();
  const projetRef = React.useRef();

  React.useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";

    async function getAllCategories() {
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      setCategories(data);

      if (window.localStorage.getItem("projet")) getProjet();
    }

    function getProjet() {
      const projet = JSON.parse(window.localStorage.getItem("projet"));

      for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        if (element.name === projet.categoryName) {
          setScrollCategories(i);
        }
      }

      document.querySelector("html").style.overflowY = "scroll";
      console.log(projet.categoryName);
      setCategoriesSelect(projet.categoryName);
      setTimeout(() => {
        handleProjet(projet, projetsSliderRef.current.offsetTop);
      }, 500);
      setTimeout(() => {
        setClose((prev) => ({ ...prev, categorieSlider: true }));
        window.localStorage.removeItem("projet");
      }, 1000);
    }

    getAllCategories();
  }, []);

  React.useEffect(() => {
    if (categorieSelect !== null) {
      setProjets(
        categories.find((categorie) => categorie.name === categorieSelect)
          .content,
      );
    } else {
      setProjets([]);
    }
  }, [categorieSelect]);

  useEffect(() => console.log(categories), [categories]);

  function leftCategorie() {
    console.log("categorie");
    setClose((prev) => ({ ...prev, categorieSlider: false }));
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.querySelector("html").style.overflow = "hidden";
      setCategoriesSelect(null);
    }, 1000);
  }

  function leftProjet() {
    window.scrollTo(0, scroll);
    setTimeout(() => {
      setProjetSelect(null);
    }, 500);
  }

  function handleProjet(projet, scroll) {
    setProjetSelect(projet);
    setScroll(scroll);
    setTimeout(() => {
      window.scrollTo(0, projetRef.current.offsetTop);
    }, 100);
  }

  return (
    <Suspense fallback={<p>Test</p>}>
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
            scrollCategories === categories.length - 1
              ? setScrollCategories(0)
              : setScrollCategories((prev) => prev + 1)
          }
        ></button>
        <button
          className="prev"
          onMouseEnter={() => hoverElement("texts")}
          onMouseLeave={() => unHoverElement()}
          onClick={() =>
            scrollCategories <= 0
              ? setScrollCategories(categories.length - 1)
              : setScrollCategories((prev) => prev - 1)
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
          style={{ transform: `translateX(-${scrollCategories * 100}vw)` }}
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
                onClick={() =>
                  projetRef.current &&
                  window.scrollY >= projetRef.current.offsetTop
                    ? leftProjet()
                    : leftCategorie()
                }
              ></span>
            )}
            <ProjetsSlider projetsArray={projets} handleProjet={handleProjet} />
          </section>
        )}

        {projetSelect && (
          <section ref={projetRef} className="projet-page-container">
            <section className="projet-page-image">
              {projetSelect.projetImage.map((image) => (
                <img src={image} />
              ))}
            </section>

            <section className="projet-page-texte">
              <h2>{projetSelect.projetName}</h2>
              <p>{projetSelect.projetDescription}</p>
            </section>
          </section>
        )}
      </main>
    </Suspense>
  );
}

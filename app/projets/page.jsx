"use client";

import React, { Suspense, useEffect, useState } from "react";

import "../../style/style.scss";
import {
  hoverElement,
  hoverImage,
  unHoverElement,
  unHoverImage,
} from "@/components/Cursor";
import ProjetsSlider from "@/components/Projets";
import Loading from "../loading";

export default function Projets() {
  const [loading, setLoading] = React.useState(false);
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
  const projetImageRef = React.useRef();

  React.useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";

    async function getAllCategories() {
      setLoading(true);
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      let realData = [];

      data.forEach((element) => {
        if (element.content.length >= 4) {
          realData.push(element);
        }
      });

      setCategories(realData);

      if (window.localStorage.getItem("projet")) getProjet();
      if (window.localStorage.getItem("category")) getCategory();
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
      setCategoriesSelect(projet.categoryName);
      setTimeout(() => {
        handleProjet(projet, projetsSliderRef.current.offsetTop);
      }, 500);
      setTimeout(() => {
        setClose((prev) => ({ ...prev, categorieSlider: true }));
        window.localStorage.removeItem("projet");
      }, 1000);
    }

    function getCategory() {
      const categ = window.localStorage.getItem("category");

      for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        if (element.name === categ) {
          setScrollCategories(i);
        }
      }

      document.querySelector("html").style.overflowY = "scroll";
      setCategoriesSelect(categ);
      setTimeout(() => {
        handleCateg();
      }, 500);
      setTimeout(() => {
        setClose((prev) => ({ ...prev, categorieSlider: true }));
        window.localStorage.removeItem("category");
      }, 1000);
    }

    getAllCategories();
    setLoading(false);
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

  function leftCategorie() {
    setClose((prev) => ({ ...prev, categorieSlider: false }));

    window.scrollTo(0, 0);
    setTimeout(() => {
      document.querySelector("html").style.overflow = "hidden";
      setProjetSelect(null);
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

  function handleCateg() {
    setTimeout(() => {
      window.scrollTo(0, projetsSliderRef.current.offsetTop);
    }, 100);
  }

  return (
    <>
      {loading ? <Loading /> : null}
      <section style={{ position: "relative" }}>
        <nav style={{ width: "100vw", height: "100vh", position: "absolute" }}>
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
        <main className="projects-page-section">
          <section
            style={{
              overflow: "hidden",
              height: "100vh",
              width: "100vw",
              position: "hidden",
            }}
          >
            <section style={{ width: `${categories.length * 100}vw` }}>
              <ul
                className="projects-page-container"
                onMouseEnter={() => hoverElement("buttons")}
                onMouseLeave={() => unHoverElement()}
                style={{
                  transform: `translateX(-${scrollCategories * 100}vw)`,
                }}
              >
                {categories.map((categorie) => (
                  <article
                    key={Math.random() * 100}
                    onClick={() => {
                      setCategoriesSelect(categorie.name);
                      document.querySelector("html").style.overflowY = "scroll";
                      setTimeout(() => {
                        window.scrollTo(0, projetsSliderRef.current.offsetTop);
                      }, 100);
                      setTimeout(() => {
                        setClose((prev) => ({
                          ...prev,
                          categorieSlider: true,
                        }));
                      }, 1000);
                    }}
                    className="project-container"
                  >
                    <h2 className="categorie-name">
                      <strong>{categorie.name}</strong>
                    </h2>

                    <section className="projects-show-container">
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                    </section>

                    <section className="projects-show-container">
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                    </section>

                    <section className="projects-show-container">
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                      {categorie.content.slice(0, 5).map((projet) => (
                        <article
                          key={Math.random() * 100}
                          className="projet-image-container"
                          style={{
                            backgroundImage: `url(${projet.projetImage})`,
                          }}
                        ></article>
                      ))}
                    </section>
                  </article>
                ))}
              </ul>
            </section>
          </section>

          {projets.length > 0 && (
            <section className="slider-projets-section" ref={projetsSliderRef}>
              {close.categorieSlider && (
                <span
                  className="close-projets-slider"
                  onClick={() =>
                    projetRef.current &&
                    window.scrollY + 200 >= projetRef.current.offsetTop
                      ? leftProjet()
                      : leftCategorie()
                  }
                ></span>
              )}
              <ProjetsSlider
                projetsArray={projets}
                handleProjet={handleProjet}
              />
            </section>
          )}

          {projetSelect && (
            <section ref={projetRef} className="projet-page-container">
              <section className="projet-page-image">
                {projetSelect.projetImage.map((image) => (
                  <img
                    ref={projetImageRef}
                    onMouseMove={(e) =>
                      hoverImage(image, projetImageRef.current, e)
                    }
                    onMouseLeave={() => unHoverImage()}
                    key={Math.random() * 100}
                    src={image}
                  />
                ))}
              </section>

              <section className="projet-page-texte">
                <h2>{projetSelect.projetName}</h2>
                <p>{projetSelect.projetDescription}</p>
              </section>
            </section>
          )}
        </main>
      </section>
    </>
  );
}

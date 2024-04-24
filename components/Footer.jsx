import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hoverElement, unHoverElement } from "./Cursor";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React, { useId } from "react";

export default function Footer() {
  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    async function getAllCategories() {
      const array = [];
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        array.push(element);
      }

      setCategory(array);
    }
    getAllCategories();
  }, []);

  function goCategory(categoryName) {
    if (typeof window === undefined) return;

    window.localStorage.setItem("category", categoryName);
  }

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
            <a href="/projets">Projets</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="https://www.linkedin.com/in/marine-sicaud/">À propos</a>
          </li>
          <li
            className="link-footer"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          >
            <a href="mailto:sicaud.marine.pro@gmail.com">Contact</a>
          </li>
        </ul>
        <ul className="link-footer-container">
          <h3 className="name-link-categorie">Projets :</h3>
          {category.map((categ) => (
            <li
              key={categ._id}
              className="link-footer"
              onClick={() => goCategory(categ.name)}
              onMouseEnter={() => hoverElement("links")}
              onMouseLeave={() => unHoverElement()}
            >
              <a href="/projets">{categ.name}</a>
            </li>
          ))}
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

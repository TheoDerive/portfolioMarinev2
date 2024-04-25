import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export default async function Competences() {
  const getCompetences = async () => {
    // Récuration des compétances
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/get-competences`,
    )
      .then((res) => res.json())
      .then((data) => data);

    return response;
  };

  const competences = await getCompetences();

  return (
    <section id="competences">
      <ul className="competences-homepage-container">
        {competences.map((competence) => (
          <li
            className="competences-homepage"
            onMouseEnter={() => hoverElement("texts")}
            onMouseLeave={() => unHoverElement()}
            key={competence._id}
          >
            <img
              src={competence.image}
              alt={`${competence.name} image`}
              className="competence-homepage-image"
            />

            <span>{competence.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

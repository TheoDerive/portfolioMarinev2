import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export default function Competences() {
  const [competences, setCompetences] = React.useState([]);

  React.useEffect(() => {
    const getCompetences = async () => {
      // Récuration des compétances
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/get-competences`,
      )
        .then((res) => res.json())
        .then((data) => data);

      setCompetences(response);
    };

    getCompetences();
  }, []);

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

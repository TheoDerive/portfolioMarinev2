import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hoverElement, unHoverElement } from "./Cursor";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function RemoveProjet({
  deleteProjet,
  deleteCategory,
  setData,
}) {
  const [canShow, setCanShow] = React.useState(false);

  const removeProjet = async (e, nameCategory, nameProjet) => {
    e.preventDefault();

    const name = { categorieName: nameCategory, projetName: nameProjet };

    const fetching = await fetch("/api/remove-projet", {
      method: "DELETE",
      body: JSON.stringify(name),
    });

    const data = await fetching.json();

    setData({ message: data.message, ok: data.status });
  };

  return (
    <>
      <button
        className="remove"
        onMouseEnter={() => hoverElement("links")}
        onMouseLeave={() => unHoverElement()}
        onClick={() => setCanShow(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {canShow ? (
        <section className="verif-remove">
          <span
            className="close-black"
            onClick={() => setCanShow(false)}
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          ></span>
          <p>
            Etes vous sur de vouloir supprimer le projet:{" "}
            {deleteProjet.projetName} ?
          </p>
          <button
            onClick={(e) =>
              removeProjet(e, deleteCategory.name, deleteProjet.projetName)
            }
            className="send"
          >
            Supprimer
          </button>
        </section>
      ) : null}
    </>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hoverElement, unHoverElement } from "./Cursor";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function RemoveCategory({ deleteCategory, setData }) {
  const [canShow, setCanShow] = React.useState(false);

  const removeCategory = async (e, nameCategory) => {
    e.preventDefault();

    const name = { name: nameCategory };

    const fetching = await fetch("/api/remove-category", {
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
            Etes vous sur de vouloir supprimer le projet: {deleteCategory.name}{" "}
            ?
          </p>
          <button
            onClick={(e) => removeCategory(e, deleteCategory.name)}
            className="send"
          >
            Supprimer
          </button>
        </section>
      ) : null}
    </>
  );
}

"use client";

import React from "react";

export default function Cursor() {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      className="cursor"
      style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }}
    ></div>
  );
}

// Actions with cursor

export function hoverElement(element) {
  const curseur = document.querySelector(".cursor");

  switch (element) {
    case "links":
      curseur.style.backgroundColor = "transparent";
      curseur.style.width = "40px";
      curseur.style.height = "40px";
      break;

    case "buttons":
      curseur.style.backgroundColor = "transparent";
      curseur.style.borderColor = "white";
      curseur.style.width = "40px";
      curseur.style.height = "40px";
      break;

    case "texts":
      curseur.style.backgroundColor = "white";
      curseur.style.width = "30px";
      curseur.style.height = "30px";
      break;

    default:
      break;
  }
}

export function unHoverElement() {
  const curseur = document.querySelector(".cursor");

  curseur.style.backgroundColor = "black";
  curseur.style.borderColor = "black";
  curseur.style.width = "20px";
  curseur.style.height = "20px";
}

export function hoverImage(image, ref, e) {
  const curseur = document.querySelector(".cursor");
  const zoom = ref.getBoundingClientRect();

  let positionPx = e.clientX - zoom.left - 50;
  let positionPy = e.clientY - zoom.top - 50;

  let positionX = 100 * (positionPx / ref.offsetWidth);
  let positionY = 100 * (positionPy / ref.offsetHeight);

  curseur.style.backgroundImage = `url(${image})`;
  curseur.style.backgroundColor = "transparent";
  curseur.style.width = "200px";
  curseur.style.height = "200px";
  curseur.style.borderWidth = "1px";
  curseur.style.backgroundSize = `${zoom.width * 1.2}px ${zoom.height * 1.2}px`;
  curseur.style.backgroundRepeat = "no-repeat";
  curseur.style.backgroundPosition = `${positionX * 1.2}% ${positionY * 1.2}%`;
}

export function unHoverImage() {
  const curseur = document.querySelector(".cursor");

  curseur.style.backgroundImage = "none";
  unHoverElement();
}

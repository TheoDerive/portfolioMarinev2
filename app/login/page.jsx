"use client";

import { hoverElement, unHoverElement } from "@/components/Cursor";
import { useStore } from "@/hooks/useStore";
import "@/style/style.scss";
import {
  faArrowRight,
  faMoon,
  faPowerOff,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function login() {
  const button = React.useRef();
  const [active, setActive] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(false);
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    document.querySelector(".cursor").style.display = "none";
    setTimeout(() => {
      setActive(true);
    }, 2000);

    setTimeout(() => {
      setActiveButton(true);
    }, 6000);
  }, []);

  React.useEffect(() => {
    if (active) {
      const passwordLength = "marinesicaud";
      setTimeout(() => {
        setInterval(() => {
          setPassword((prev) => {
            if (prev.length < 11) {
              return `${prev}${passwordLength[prev.length]}`;
            } else {
              return prev;
            }
          });
        }, 200);
      }, 1000);
    }
  }, [active]);

  return (
    <main className="login">
      <section className="login-container">
        <article
          className="user"
          onMouseEnter={() => hoverElement("links")}
          onMouseLeave={() => unHoverElement()}
        >
          <div />
          <p>Marine Sicaud</p>
        </article>

        <section
          className="input-container"
          style={{ transform: active ? "translateY(0)" : "translateY(50px)" }}
        >
          <input
            type="password"
            onMouseEnter={() => hoverElement("texts")}
            onMouseLeave={() => unHoverElement()}
            disabled
            value={password}
          />
          <button
            className={`button-login ${activeButton ? "button-active" : null}`}
            style={{
              opacity: password.length > 3 ? "1" : "0",
              transform:
                password.length > 3 ? "translateX(0)" : "translateX(-60px)",
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </section>
      </section>

      <ul className="ui">
        <li>
          <FontAwesomeIcon icon={faPowerOff} />
        </li>

        <li>
          <FontAwesomeIcon icon={faReply} />
        </li>

        <li>
          <FontAwesomeIcon icon={faMoon} />
        </li>
      </ul>
    </main>
  );
}

import React from "react";
import Popup from "./Popup";

export default function Password({ data, setData }) {
  const [password, setPassword] = React.useState("");

  function checkPassword() {
    if (password === process.env.NEXT_PUBLIC_MOT_DE_PASSE) {
      window.sessionStorage.setItem("password", true);
      setData({
        message:
          "Vous pouvez acceder a la page administateur, veuillez patienter",
        ok: true,
      });
    } else {
      setData({
        message: "Le mot de passe est incorrect",
        ok: false,
      });
    }
  }

  return (
    <>
      <section className="password-page">
        <p>Montre moi que tu peux acceder a la page administateur:</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={checkPassword} className="send">
          Valider
        </button>
      </section>
      <Popup data={data} />
    </>
  );
}

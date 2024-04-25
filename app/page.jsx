"use client";

import Nav from "@/components/Nav";
import "../style/style.scss";
import Header from "@/components/Header";
import Competences from "@/components/Competences";
import { ProjetsSlider } from "@/components/Projets";
import Footer from "@/components/Footer";
import React from "react";

export default function Home() {
  const [projets, setProjets] = React.useState([]);

  React.useEffect(() => {
    async function getAllCategories() {
      const array = [];
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      data.forEach((element) => {
        element.content.forEach((projet) => {
          array.push(projet);
        });
      });
      array.sort((a, b) => {
        const dateA = new Date(a.projetDate);
        const dateB = new Date(b.projetDate);
        return dateB - dateA;
      });

      setProjets(array.slice(0, 4));
    }
    getAllCategories();
  }, []);

  function clickHomeProjet(projet) {
    if (typeof window === undefined) return;

    window.localStorage.setItem("projet", JSON.stringify(projet));
    window.location.pathname = "/projets";
  }

  return (
    <>
      <Nav />
      <Header />
      <Competences />
      <ProjetsSlider projetsArray={projets} handleProjet={clickHomeProjet} />
      <Footer />
    </>
  );
}

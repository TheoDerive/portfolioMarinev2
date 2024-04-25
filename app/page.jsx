"use client";

import Nav from "@/components/Nav";
import "../style/style.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";

const Competences = dynamic(() => import("@/components/Competences"), {
  loading: () => <Loading />, // Composant de chargement à afficher pendant le chargement
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});

const ProjetsSlider = dynamic(() => import("@/components/Projets"), {
  loading: () => <Loading />, // Composant de chargement à afficher pendant le chargement
  ssr: false, // Désactiver le rendu côté serveur pour ce composant
});

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
    <Suspense fallback={<Loading />}>
      <Nav />
      <Header />
      <Competences />
      <ProjetsSlider projetsArray={projets} handleProjet={clickHomeProjet} />
      <Footer />
    </Suspense>
  );
}

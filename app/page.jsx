"use client";

import Nav from "@/components/Nav";
import "../style/style.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { useStore } from "@/hooks/useStore";

const Cinematic = dynamic(() => import("@/components/Cinematic"), {
  loading: () => <Loading />, // Composant de chargement à afficher pendant le chargement
  ssr: true, // Désactiver le rendu côté serveur pour ce composant
});

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

  const { isCinematic, setIsCinematic } = useStore();

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
    isAfterSevenPM();
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(isAfterSevenPM, 300000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const local = window.sessionStorage.getItem("cinematicPass");
    console.log(local);

    if (local) {
      setIsCinematic(false);
    }
  }, []);

  React.useEffect(() => {
    document.querySelector(".cursor").style.display = "flex";
  }, [isCinematic]);

  function isAfterSevenPM() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentHour = hours * 60 + minutes;

    const sevenPM = 19 * 60;

    if (currentHour >= sevenPM) {
      document.querySelector(".eyes-confort").style.display = "flex";
    } else {
      document.querySelector(".eyes-confort").style.display = "none";
    }
  }

  function clickHomeProjet(projet) {
    if (typeof window === undefined) return;

    window.localStorage.setItem("projet", JSON.stringify(projet));
    window.location.pathname = "/projets";
  }

  return (
    <Suspense fallback={<Loading />}>
      {isCinematic ? (
        <Cinematic />
      ) : (
        <>
          <Nav />
          <Header />
          <Competences />
          <ProjetsSlider
            projetsArray={projets}
            handleProjet={clickHomeProjet}
          />
          <Footer />
        </>
      )}
    </Suspense>
  );
}

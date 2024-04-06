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
      setProjets(array.slice(0, 3));
    }
    getAllCategories();
  }, []);

  return (
    <>
      <Nav />
      <Header />
      <Competences />
      <ProjetsSlider projetsArray={projets} />
      <Footer />
    </>
  );
}

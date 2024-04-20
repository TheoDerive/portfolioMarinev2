"use client";

import NewCategorie from "@/components/NewCategory";
import NewProjet from "@/components/NewProjet";
import RemoveCategory from "@/components/RemoveCategory";
import RemoveProjet from "@/components/RemoveProjet";
import UpdateCategory from "@/components/UpdateCateogry";
import UpdateProjet from "@/components/UpdateProjet";
import "../../style/style.scss";

import React from "react";
import { hoverElement, unHoverElement } from "@/components/Cursor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";
import Password from "@/components/Password";

export default function Dashboard() {
  const [updatedProjet, setUpdatedProjet] = React.useState({
    isShow: false,
    pevCategoryName: "",
    prevProjetName: "",
    prevProjetImage: "",
    prevProjetDescription: "",
    prevProjetDate: "",
    prevIsLarge: false,
    prevIsTall: false,
    categoryName: "",
    projetName: "",
    projetImage: "",
    projetDescription: "",
    projetDate: "",
    isLarge: false,
    isTall: false,
  });
  const [updatedCategory, setUpdatedCategory] = React.useState({
    isShow: false,
    categoryName: "",
    newCategoryName: "",
  });
  const [categories, setCategories] = React.useState([]);
  const [projetData, setProjetData] = React.useState({
    categoryName: "",
    projetName: "",
    projetImage: "",
    projetDescription: "",
    projetDate: "",
    isLarge: false,
    isTall: false,
  });

  const [category, setCategory] = React.useState({
    categoryName: "",
    imageCategory: "",
  });

  const [newCategorie, setNewCategory] = React.useState(false);
  const [newProjet, setNewProjet] = React.useState({
    show: false,
    categoryName: "",
  });

  const [data, setData] = React.useState({
    message: "",
    ok: true,
  });

  const [passwordValid, setPasswordValid] = React.useState(false);

  React.useEffect(() => {
    if (data.message === "" || !document.querySelector(".popup-container"))
      return;

    document.querySelector(".popup-container").style.opacity = 1;
    if (data.ok === false) {
      setTimeout(() => {
        document.querySelector(".popup-container").style.opacity = 0;
      }, 5000);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [data]);

  React.useEffect(() => {
    async function getAllCategories() {
      const data = await fetch("/api/get-all-categories")
        .then((response) => response.json())
        .then((datas) => datas.data);

      setCategories(data);
    }

    function isPasswordValid() {
      const session = window.sessionStorage.getItem("password");

      if (session === "true") {
        setPasswordValid(true);
      }
    }

    getAllCategories();
    isPasswordValid();
  }, []);

  return (
    <>
      {passwordValid ? (
        <main className="dashboard-page">
          <button
            className="new"
            style={{ marginBottom: "50px", marginTop: "20px" }}
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
            onClick={() => setNewCategory(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Nouvelle Categorie
          </button>

          <section className="all-content-container">
            {categories.map((categorie) => (
              <article className="categorie-container">
                <section className="categorie-information">
                  <h2>{categorie.name}</h2>
                  <button
                    className="new"
                    onMouseEnter={() => hoverElement("links")}
                    onMouseLeave={() => unHoverElement()}
                    onClick={() => {
                      setNewProjet({
                        show: true,
                        categoryName: categorie.name,
                      });
                      setProjetData((prev) => ({
                        ...prev,
                        categoryName: categorie.name,
                      }));
                    }}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                  </button>
                  <button
                    className="updateButton"
                    onMouseEnter={() => hoverElement("links")}
                    onMouseLeave={() => unHoverElement()}
                    onClick={() =>
                      setUpdatedCategory((prev) => ({
                        ...prev,
                        isShow: true,
                        categoryName: categorie.name,
                      }))
                    }
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <RemoveCategory
                    setData={setData}
                    deleteCategory={categorie}
                  />
                </section>
                <section className="caroussel-container">
                  <section
                    style={{
                      width: `${(categorie.content.length / 2) * 100}vw`,
                    }}
                    className="categorie-content-container"
                  >
                    {categorie.content.map((projetCategorie) => (
                      <article className="projet-container">
                        <img
                          className="projet-image"
                          src={projetCategorie.projetImage}
                        />
                        <div className="projet-information">
                          <h3>{projetCategorie.projetName}</h3>
                          <button
                            className="updateButton"
                            onMouseEnter={() => hoverElement("links")}
                            onMouseLeave={() => unHoverElement()}
                            onClick={(e) =>
                              setUpdatedProjet({
                                isShow: true,
                                prevCategoryName: categorie.name,
                                prevProjetName: projetCategorie.projetName,
                                prevProjetImage: projetCategorie.projetImage,
                                prevProjetDescription:
                                  projetCategorie.projetDescription,
                                prevProjetDate: projetCategorie.projetDate,
                                prevIsLarge: projetCategorie.isLarge,
                                prevIsTall: projetCategorie.isTall,
                                categoryName: categorie.name,
                                projetName: projetCategorie.projetName,
                                projetImage: projetCategorie.projetImage,
                                projetDescription:
                                  projetCategorie.projetDescription,
                                projetDate: projetCategorie.projetDate,
                                isLarge: projetCategorie.isLarge,
                                isTall: projetCategorie.isTall,
                              })
                            }
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <RemoveProjet
                            deleteCategory={categorie}
                            setData={setData}
                            deleteProjet={projetCategorie}
                          />
                        </div>
                      </article>
                    ))}
                  </section>
                </section>
              </article>
            ))}
          </section>

          <UpdateProjet
            setUpdatedProjet={setUpdatedProjet}
            updatedProjet={updatedProjet}
            categories={categories}
            setData={setData}
          />
          <UpdateCategory
            updatedCategory={updatedCategory}
            setUpdatedCategory={setUpdatedCategory}
            setData={setData}
          />

          {newCategorie ? (
            <NewCategorie
              setCategory={setCategory}
              category={category}
              setData={setData}
              setNewCategory={setNewCategory}
            />
          ) : null}

          {newProjet.show ? (
            <NewProjet
              categories={categories}
              setData={setData}
              setProjetData={setProjetData}
              projetData={projetData}
              setNewProjet={setNewProjet}
              categoryName={newProjet.categoryName}
            />
          ) : null}

          <Popup data={data} />
        </main>
      ) : (
        <Password setData={setData} data={data} />
      )}
    </>
  );
}

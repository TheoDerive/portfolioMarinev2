import { hoverElement, unHoverElement } from "./Cursor";

export default function NewProjet({
  projetData,
  setProjetData,
  categories,
  setNewProjet,
  categoryName,
  setData,
}) {
  const sendProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(projetData);

    for (let index = 0; index < projetData.projetImage.length; index++) {
      const element = projetData.projetImage[index];

      formData.append(index, element);
    }

    formData.set("body", JSON.stringify(projetData));
    formData.set("length", projetData.projetImage.length);

    const fetching = await fetch("/api/new-projet", {
      method: "POST",
      body: formData,
    });
    const data = await fetching.json();
    setData({ message: data.message, ok: data.status });
  };
  function close(e) {
    e.preventDefault();
    unHoverElement();
    setNewProjet(false);
    setProjetData({
      categoryName: "",
      projetName: "",
      projetImage: "",
      projetDescription: "",
      projetDate: "",
    });
  }

  return (
    <form encType="multipart/form-data" className="new-projet-container">
      <span
        className="close-black"
        onClick={(e) => close(e)}
        onMouseEnter={() => hoverElement("links")}
        onMouseLeave={() => unHoverElement()}
      ></span>
      <label htmlFor="allCategories">
        <p>A quelle categorie votre projet appartient: </p>
        <select
          name="allCategories"
          onChange={(e) => {
            setProjetData((prev) => ({
              ...prev,
              categoryName: e.target.value,
            }));
          }}
          defaultValue={categoryName}
          id="category"
        >
          {categories.map((element) => (
            <option value={element.name}>{element.name}</option>
          ))}
        </select>
      </label>

      <label htmlFor="projetName">
        <p>Comment s'appel votre projet: </p>
        <input
          type="text"
          name="projetName"
          id="input"
          placeholder="Nom du projet"
          onChange={(e) =>
            setProjetData((prev) => ({ ...prev, projetName: e.target.value }))
          }
        />
      </label>

      <label htmlFor="projetImage">
        <p>Avez vous une ou plusieurs photo(s) de votre projet:</p>
        <input
          type="file"
          name="projetImage"
          multiple
          onChange={(e) =>
            setProjetData((prev) => ({
              ...prev,
              projetImage: e.target.files,
            }))
          }
        />
      </label>

      <label htmlFor="projetDescription">
        <p>Dites m'en plus sur votre projet:</p>
        <input
          type="text"
          name="projetDescription"
          id="input"
          placeholder="Description du projet"
          onChange={(e) =>
            setProjetData((prev) => ({
              ...prev,
              projetDescription: e.target.value,
            }))
          }
        />
      </label>

      <label htmlFor="projetDate">
        <p>Quand es-ce que vous l'avez fini: </p>
        <input
          type="date"
          value={projetData.projetDate}
          onChange={(e) =>
            setProjetData((prev) => ({ ...prev, projetDate: e.target.value }))
          }
          name="projetDate"
        />
      </label>

      <button
        className="send"
        onClick={(e) => sendProject(e)}
        onMouseEnter={() => hoverElement("buttons")}
        onMouseLeave={() => unHoverElement()}
      >
        Send Projet
      </button>
    </form>
  );
}

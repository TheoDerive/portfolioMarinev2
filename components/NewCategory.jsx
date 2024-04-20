import { hoverElement, unHoverElement } from "./Cursor";

export default function NewCategorie({
  setCategory,
  category,
  setNewCategory,
  setData,
}) {
  const sendCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("file", category.imageCategory);
    formData.set("body", JSON.stringify(category));

    const fetching = await fetch("/api/new-category", {
      method: "POST",
      body: formData,
    });
    const data = await fetching.json();

    setData({ message: data.message, ok: data.status });
  };
  return (
    <form className="new-category-container" encType="multipart/form-data">
      <span
        className="close-black"
        onMouseEnter={() => hoverElement("links")}
        onMouseLeave={() => unHoverElement()}
        onClick={(e) => {
          e.preventDefault();
          unHoverElement();
          setNewCategory(false);
          setCategory({ categoryName: "" });
        }}
      ></span>
      <label htmlFor="projetDescription">
        <p>Comment voulez vous que votre categorie s'appelle:</p>
        <input
          type="text"
          name="projetDescription"
          id="input"
          placeholder="Nom de la categorie"
          value={category.categoryName}
          onChange={(e) =>
            setCategory((prev) => ({ ...prev, categoryName: e.target.value }))
          }
        />
      </label>
      <button
        className="send"
        onMouseEnter={() => hoverElement("buttons")}
        onMouseLeave={() => unHoverElement()}
        onClick={(e) => sendCategory(e)}
      >
        Send Category
      </button>
    </form>
  );
}

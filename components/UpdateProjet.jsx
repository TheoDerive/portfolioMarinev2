import { hoverElement, unHoverElement } from "./Cursor";

export default function UpdateProjet({
  updatedProjet,
  setUpdatedProjet,
  categories,
  setData,
}) {
  const UpdateProjet = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("file", updatedProjet.projetImage);
    formData.set("body", JSON.stringify(updatedProjet));

    const fetching = await fetch("/api/update-projet", {
      method: "PUT",
      body: formData,
    });

    const data = await fetching.json();

    setData({ message: data.message, ok: data.status });
  };

  return (
    <>
      {updatedProjet.isShow ? (
        <form encType="multipart/form-data" className="update-projet-container">
          <span
            className="close-black"
            onClick={() => {
              unHoverElement();
              setUpdatedProjet((prev) => ({ ...prev, isShow: false }));
            }}
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
          ></span>

          <label htmlFor="category">
            <p>A quelle categorie votre projet appartient: </p>
            <select
              name="category"
              onChange={(e) =>
                setUpdatedProjet((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }))
              }
              value={updatedProjet.categoryName}
              id="category"
            >
              {categories.map((element) => (
                <option
                  value={element.name}
                  selected={updatedProjet.categoryName === element.name}
                >
                  {element.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="projetName">
            <p>Comment s'appel votre projet: </p>
            <input
              type="text"
              value={updatedProjet.projetName}
              name="projetName"
              id="input"
              onChange={(e) =>
                setUpdatedProjet((prev) => ({
                  ...prev,
                  projetName: e.target.value,
                }))
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
                setUpdatedProjet((prev) => ({
                  ...prev,
                  projetImage: e.target.files[0],
                }))
              }
            />
          </label>

          <label htmlFor="projetDescription">
            <p>Dites m'en plus sur votre projet:</p>
            <input
              type="text"
              name="projetDescription"
              value={updatedProjet.projetDescription}
              id="input"
              onChange={(e) =>
                setUpdatedProjet((prev) => ({
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
              value={updatedProjet.projetDate}
              onChange={(e) =>
                setUpdatedProjet((prev) => ({
                  ...prev,
                  projetDate: e.target.value,
                }))
              }
              name="projetDate"
            />
          </label>

          <button
            className="send"
            onClick={(e) => UpdateProjet(e)}
            onMouseEnter={() => hoverElement("buttons")}
            onMouseLeave={() => unHoverElement()}
          >
            Send Projet
          </button>
        </form>
      ) : null}
    </>
  );
}

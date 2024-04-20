import { hoverElement, unHoverElement } from "./Cursor";

export default function UpdateCategory({
  updatedCategory,
  setUpdatedCategory,
  setData,
}) {
  const updateCategory = async (e, nameCategory, newCategoryName) => {
    e.preventDefault();

    const name = { name: nameCategory, newCategoryName: newCategoryName };

    const fetching = await fetch("/api/update-category", {
      method: "PUT",
      body: JSON.stringify(name),
    });

    const data = await fetching.json();

    setData({ message: data.message, ok: data.status });
  };

  return (
    <>
      {updatedCategory.isShow ? (
        <form
          encType="multipart/form-data"
          className="update-category-container"
        >
          <h1>{updatedCategory.categoryName}</h1>
          <span
            className="close-black"
            onMouseEnter={() => hoverElement("links")}
            onMouseLeave={() => unHoverElement()}
            onClick={(e) => {
              e.preventDefault();
              unHoverElement();
              setUpdatedCategory((prev) => ({ ...prev, isShow: false }));
            }}
          ></span>
          <label htmlFor="projetDescription">
            <p>Comment voulez vous que votre categorie s'appelle:</p>
            <input
              type="text"
              value={updatedCategory.newCategoryName}
              name="projetDescription"
              id="input"
              placeholder="Nouveau nom de votre categorie"
              onChange={(e) =>
                setUpdatedCategory((prev) => ({
                  ...prev,
                  newCategoryName: e.target.value,
                }))
              }
            />
          </label>

          <button
            className="send"
            onClick={(e) =>
              updateCategory(
                e,
                updatedCategory.categoryName,
                updatedCategory.newCategoryName,
              )
            }
          >
            Send Category
          </button>
        </form>
      ) : null}
    </>
  );
}

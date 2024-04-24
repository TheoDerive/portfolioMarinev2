import Categories from "@/models/Categories";
import Projects from "@/models/Projects";
import { connectToDB } from "@/utils/database";
import { octokit } from "@/utils/github";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  await connectToDB();

  const data = await req.formData();
  const body = await JSON.parse(data.get("body"));
  const length = data.get("length");
  let pass = false;
  let getPrev = false;

  let images = [];
  let imagesPath = [];

  for (let index = 0; index < length; index++) {
    const file = data.get(`${index}`);
    if (file.type === undefined) {
      pass = true;
      getPrev = true;
    } else if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/webp" ||
      file.type === "image/svg+xml"
    ) {
      pass = true;
    }

    if (!pass) {
      return NextResponse.json({
        message: "veuillez ajouter une image et pas un autre type de fichier",
        status: false,
      });
    }

    if (!getPrev) {
      console.log(file, getPrev);
      imagesPath.push(`/assets/${body.categoryName}/${file.name}`);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      images.push(buffer);
    }
  }

  const categorie = await Categories.findOne({ name: body.prevCategoryName });

  if (categorie) {
    const content = categorie.content;

    const filterContent = content.filter(
      (projet) => projet.projetName !== body.prevProjetName,
    );

    await Categories.findOneAndUpdate(
      { name: categorie.name },
      { content: filterContent },
    );
    const newCategorie = await Categories.findOne({ name: body.categoryName });

    if (newCategorie) {
      const newProjet = await new Projects({
        categoryName: body.categoryName,
        projetName: body.projetName,
        projetImage: !getPrev ? imagesPath : body.prevProjetImage,
        projetDescription: body.projetDescription,
        projetDate: body.projetDate,
        isLarge: body.isLarge,
        isTall: body.isTall,
      });

      let finish = true;

      if (!getPrev) {
        for (let index = 0; index < length; index++) {
          const image = images[index];
          const imagePath = imagesPath[index];

          const {
            updated,
            data: { commit },
          } = await octokit.createOrUpdateTextFile({
            owner: "TheoDerive",
            repo: "portfolioMarinev2",
            path: `public${imagePath}`,
            content: image,
            message: `Ajout d'image pour un projet`,
          });

          if (!updated) {
            finish = false;
          }
        }
      }

      const projetExist = newCategorie.content.find(
        (projet) => projet.projetName === newProjet.projetName,
      );

      if (!projetExist && finish) {
        newCategorie.content.push(newProjet);
        try {
          await Categories.findOneAndUpdate(
            { name: newCategorie.name },
            { content: newCategorie.content },
          );

          return NextResponse.json({
            message: "Votre projet a bien été modifié",
            status: true,
          });
        } catch (error) {
          return NextResponse.json({
            message: "Il y a eu une erreur dans l'ajout de votre projet",
            status: false,
          });
        }
      } else {
        return NextResponse.json({
          message: "Le projet fait déjà partie de la categorie de destination",
          status: false,
        });
      }
    } else {
      return NextResponse.json({
        message: "La categorie de destination n'existe pas",
        status: false,
      });
    }
  } else {
    return NextResponse.json({
      message: "Le projet ne fait partie d'aucune categorie",
      status: false,
    });
  }
}

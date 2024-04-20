import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories";
import Projects from "@/models/Projects";
import { octokit } from "@/utils/github";

export async function POST(req, res) {
  await connectToDB();
  const data = await req.formData();
  const body = await JSON.parse(data.get("body"));
  const length = data.get("length");

  let images = [];
  let imagesPath = [];

  for (let index = 0; index < length; index++) {
    const file = data.get(`${index}`);

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp" &&
      file.type !== "image/svg+xml"
    ) {
      return NextResponse.json({
        message: "veuillez ajouter une image et pas un autre type de fichier",
        status: false,
      });
    }

    imagesPath.push(`/assets/${body.categoryName}/${file.name}`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    images.push(buffer);
  }

  const category = await Categories.findOne({ name: body.categoryName });

  if (
    body.categoryName === "" ||
    body.projetName === "" ||
    images.length < 1 ||
    body.projetDescription === "" ||
    body.projetDate === ""
  ) {
    return NextResponse.json({
      message: "veuillez renseigner tous les champs",
      status: false,
    });
  }

  if (category) {
    const projetExist = category.content.find(
      (element) => element.projetName === body.projetName,
    );

    if (!projetExist) {
      const newProject = await new Projects({
        categoryName: body.categoryName,
        projetName: body.projetName,
        projetImage: imagesPath,
        projetDescription: body.projetDescription,
        projetDate: body.projetDate,
        isLarge: body.isLarge,
        isTall: body.isTall,
      });
      category.content.push(newProject);

      try {
        let finish = true;

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

        if (finish) {
          try {
            await category.save();

            return NextResponse.json({
              message: "Votre projet à été ajouter",
              status: true,
            });
          } catch (error) {
            return NextResponse.json({
              message: `Il y a eu un problème dans l'ajout de votre projet, veillez reessayer ou contacter le developpeur a lemail suivant: theo.derive.pro@gmail.com`,
              status: false,
            });
          }
        }
      } catch (error) {
        return NextResponse.json({
          message: `Il y a eu un problème dans l'ajout de votre image, veuillez reessayez`,
          status: false,
        });
      }
    } else {
      return NextResponse.json({
        message: `Votre projet existe déjà !`,

        status: false,
      });
    }
  } else {
    return NextResponse.json({
      message: `La catégorie de votre projet n'a pas été trouvé`,
      status: false,
    });
  }
}

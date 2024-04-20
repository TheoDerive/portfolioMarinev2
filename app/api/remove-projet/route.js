import Categories from "@/models/Categories";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  await connectToDB();
  const body = await req.json();

  try {
    const category = await Categories.findOne({ name: body.categorieName });

    const newArray = category.content.filter(
      (projet) => projet.projetName !== body.projetName,
    );

    await Categories.findOneAndUpdate(
      { name: body.categorieName },
      { content: newArray },
    );
    return NextResponse.json({
      message: "Votre projet a bien été supprimer...",
      status: true,
    });
  } catch (error) {
    return NextResponse.json({
      message:
        "Votre projet n'a pas pu été supprimer, veuillez reessayer, si le problme persiste, veuillez contacter le developpeur sur le mail suivant: theo.derive.pro@gmail.com",
      status: false,
    });
  }
}

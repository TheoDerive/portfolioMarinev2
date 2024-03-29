import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories";
import { octokit } from "@/utils/github";

export async function POST(req, res) {
  await connectToDB();
  const data = await req.formData()
  const file = data.get('file')
  const arrayBuffer = file ? await file.arrayBuffer() : null
  let buffer = new Uint8Array(arrayBuffer)

  const body = await JSON.parse(data.get('body'))

  const categoryExist = await Categories.find({name: body.categoryName})

  if (categoryExist.length === 0 && body.categoryName.length > 2) {
    const newCategory = new Categories({
      name: body.categoryName,
      image: `/assets/${file.name}`,
      content: []
    })

    try {
      const {
        updated,
        data: { commit },
      } = await octokit.createOrUpdateTextFile({
        owner: "TheoDerive",
        repo: "portfolioMarinev2",
        path: `public/assets/${file.name}`,
        content: buffer,
        message: `Ajout de ${file.name}`,
      })

      if (updated) {
        try {
          await newCategory.save()
          return NextResponse.json({message: `Votre categorie a été ajouté avec succes !`})
        } catch (error) {
          return NextResponse.json({message: `Il y a eu une erreur dans la création de votre catéforie: ${error}`})
        }  
      }
    } catch (error) {
      return NextResponse.json({message: `Il y a eu un problème dans l'ajout de votre image: ${error}`})
    }
  }else{
    return NextResponse.json({message: `La catégorie que vous essayer de crée existe déjà !`})
  }
}
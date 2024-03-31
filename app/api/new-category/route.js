import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories";

export async function POST(req, res) {
  await connectToDB();
  const data = await req.formData()

  const body = await JSON.parse(data.get('body'))

  const categoryExist = await Categories.find({name: body.categoryName})

  if (categoryExist.length === 0 && body.categoryName.length > 2) {
    const newCategory = new Categories({
      name: body.categoryName,
      content: []
    })

    try {
      await newCategory.save()
      return NextResponse.json({message: `Votre categorie a été ajouté avec succes !`})
    } catch (error) {
      return NextResponse.json({message: `Il y a eu une erreur dans la création de votre catéforie: ${error}`})
    } 
  }else{
    return NextResponse.json({message: `La catégorie que vous essayer de crée existe déjà !`})
  }
}
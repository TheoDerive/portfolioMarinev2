import Categories from "@/models/Categories";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function PUT(req, res){
    await connectToDB()

    const body = await req.json()
    const categorie = await Categories.findOne({name: body.name})
    const categorieExist = await Categories.findOne({name: body.newCategoryName})

    if(categorie && !categorieExist){

        try {
            await Categories.findOneAndUpdate({name: body.name}, {name: body.newCategoryName})

            return NextResponse.json({message: "Votre catéorie a bien été modifiée !"})
        } catch (error) {
            return NextResponse.json({message: "La modification de votre catégorie à échoué", error: error})
        }
    }else{
        return NextResponse.json({message: "Le nouveaux nom pour votre categorie existe déjà ou alors vous essayez de modifié une categorie inéxistante"})
    }

}
import Categories from "@/models/Categories";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req, res){
    await connectToDB()
    const body = await req.json()

    try {
        const category = await Categories.findOne({name: body.categorieName})

        const newArray = category.content.filter(projet => projet.projetName !== body.projetName)

        await Categories.findOneAndUpdate({name: body.categorieName}, {content: newArray})
        return NextResponse.json({message: "Votre categorie a bien été supprimer..."})
    } catch (error) {
        return NextResponse.json({message: "Votre categorie n'a pas pu été supprimer..."})
    }
}
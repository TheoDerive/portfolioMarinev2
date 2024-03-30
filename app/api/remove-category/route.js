import Categories from "@/models/Categories";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req, res){
    await connectToDB()
    const body = await req.json()

    console.log(body)

    try {
        await Categories.findOneAndDelete({name: body.name})
        return NextResponse.json({message: "Votre categorie a bien été supprimer..."})
    } catch (error) {
        return NextResponse.json({message: "Votre categorie n'a pas pu été supprimer..."})
    }
}
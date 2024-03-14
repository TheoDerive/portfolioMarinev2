import { connectToDB } from "@/utils/database";
import Competances from "@/models/Competances";
import { NextResponse } from "next/server";

export async function GET(req, res){
    await connectToDB()

    try {
        const allCompetances = await Competances.find({})
        return NextResponse.json(allCompetances)
    } catch (error) {
        console.error('Il y a eu une erreur \n \n', error)
        return NextResponse.json({
            message: 'Impossible de récuperer les compétances...'
        })
    }
}
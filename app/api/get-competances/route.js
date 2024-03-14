import { connectToDB } from "@/utils/database";
import Competences from "@/models/Competances";
import { NextResponse } from "next/server";

export async function GET(req, res){
    await connectToDB()
    
    try {
        const allCompetences = await Competences.find({})
        return NextResponse.json(allCompetences)
    } catch (error) {
        console.error('Il y a eu une erreur \n \n', error)
        return NextResponse.json({
            message: 'Impossible de récuperer les compétences...'
        })
    }
}
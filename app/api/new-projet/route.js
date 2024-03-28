import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories"; 
import Projects from "@/models/Projects";

const fs = require('fs')


export async function POST(req, res){
    await connectToDB()
    const data = await req.formData()
    const file = data.get('file')
    const body = await JSON.parse(data.get('body'))

    const category = await Categories.find({name: body.categoryName})
    if(category.length > 0){

        const newProject = new Projects({
            categoryName: body.categoryName,
            projetName: body.projetName,
            projetImage: 'image',
            projetDescription: body.projetDescription,
            projetDate: body.projetDate,
            isLarge: body.isLarge,
            isTall: body.isTall
        })

        console.log(newProject)
        category[0].content.push(newProject)

        try {
            const publicFolderPath = './public';

            // Nom du fichier à créer
            const fileName = 'nouveau-fichier.txt';

            // Contenu du fichier à créer
            const fileContent = 'Contenu du nouveau fichier';

            // Créer le fichier
            fs.writeFileSync(`${publicFolderPath}/${fileName}`, fileContent);

            await Categories.findOneAndUpdate({name: body.categoryName}, {content: category[0].content})

            return NextResponse.json({message: 'Votre projet à été ajouter'})
        } catch (error) {
            return NextResponse.json({message: `Il y a eu un problème dans l'ajout de votre projet: ${error}`})
        }

    }else {
        return NextResponse.json({message: `La catégorie de votre projet n'a pas été trouvé`})
    } 
}
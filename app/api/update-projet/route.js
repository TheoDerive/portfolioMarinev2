import Categories from "@/models/Categories";
import Projects from "@/models/Projects";
import { connectToDB } from "@/utils/database";
import { octokit } from "@/utils/github";
import { NextResponse } from "next/server";

export async function PUT(req, res){
    await connectToDB()

    const data = await req.formData()
    const file = data.get('file')
    const arrayBuffer = typeof file === 'object' ? await file.arrayBuffer() : null
    let buffer = new Uint8Array(arrayBuffer)

    const body = await JSON.parse(data.get('body'))


    const categorie = await Categories.findOne({name: body.prevCategoryName})

    if(categorie){

        const content = categorie.content

        const filterContent = content.filter(projet => projet.projetName !== body.prevProjetName)

        await Categories.findOneAndUpdate({name:  categorie.name}, {content: filterContent})
        const newCategorie = await Categories.findOne({name: body.categoryName})

        if(newCategorie){
            const newProjet = await new Projects({
                categoryName: body.categoryName,
                projetName: body.projetName,
                projetImage: typeof file === 'object' ? `/assets/${body.categoryName}/${file.name}` : body.prevProjetImage,
                projetDescription: body.categoprojetDescriptionryName,
                projetDate: body.projetDate,
                isLarge: body.isLarge,
                isTall: body.isTall
            })

            const {
                updated,
                data: { commit },
              } = await octokit.createOrUpdateTextFile({
                owner: "TheoDerive",
                repo: "portfolioMarinev2",
                path: `public/assets/${body.categoryName}/${file.name}`,
                content: buffer,
                message: `Ajout de ${file.name}`,
            })
    
            const projetExist = newCategorie.content.find(projet => projet.projetName === newProjet.projetName)
    
            if(!projetExist){
                newCategorie.content.push(newProjet)
                try {
                    await Categories.findOneAndUpdate({name: newCategorie.name}, {content: newCategorie.content})
    
                    return NextResponse.json({message: "Votre projet a bien été modifié"})
                } catch (error) {
                    return NextResponse.json({message: "Il y a eu une erreur dans l'ajout de votre projet"})
                }
            }else {
                return NextResponse.json({message: "Le projet fait déjà partie de la categorie de destination"})
            }
        }else{
            return NextResponse.json({message: "La categorie de destination n'existe pas"})
        }

        

        

    }else{
        return NextResponse.json({message: "Le projet ne fait partie d'aucune categorie"})
    }
}
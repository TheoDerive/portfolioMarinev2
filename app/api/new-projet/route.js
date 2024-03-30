import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories"; 
import Projects from "@/models/Projects";
import { octokit } from "@/utils/github";


export async function POST(req, res){
    await connectToDB()
    const data = await req.formData()
    const file = data.get('file')
    const arrayBuffer = file ? await file.arrayBuffer() : null
    let buffer = new Uint8Array(arrayBuffer)

    const body = await JSON.parse(data.get('body'))

    const category = await Categories.findOne({name: body.categoryName})
    
    if(category){
      const projetExist = category.content.find(element => element.projetName === body.projetName)
  
      if(!projetExist){
        const newProject = await new Projects({
          categoryName: body.categoryName,
          projetName: body.projetName,
          projetImage:`/assets/${body.categoryName}/${file.name}`,
          projetDescription: body.projetDescription,
          projetDate: body.projetDate,
          isLarge: body.isLarge,
          isTall: body.isTall
        })
        category.content.push(newProject)

        try {
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

          if(updated){
            try {
              await category.save()

              return NextResponse.json({message: 'Votre projet à été ajouter'})
            } catch (error) {
              return NextResponse.json({message: `Il y a eu un problème dans l'ajout de votre projet: ${error}`})
            }
          } 
        } catch (error) {
            return NextResponse.json({message: `Il y a eu un problème dans l'ajout de votre image: ${error}`})
        }
      }else {
        return NextResponse.json({message: `Votre projet existe déjà !`})
      }
    }else {
        return NextResponse.json({message: `La catégorie de votre projet n'a pas été trouvé`})
    } 
}
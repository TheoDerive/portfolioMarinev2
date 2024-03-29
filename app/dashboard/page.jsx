'use client'

import React from "react"
export default function Dashboard(){
    const [projetData, setProjetData] = React.useState({
        categoryName: '',
        projetName: '',
        projetImage: '',
        projetDescription: '',
        projetDate: "",
        isLarge: false,
        isTall: false
    })

    const [category, setCategory] = React.useState({
        categoryName: "",
        imageCategory: "",
    })

    const sendProject = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('file', projetData.projetImage);
        formData.set('body', JSON.stringify(projetData));

        const fetching = await fetch("/api/new-projet", {
            method: 'POST',
            body: formData
          })
        const data = await fetching.json()


        console.log(data)

    }

    const sendCategory = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('file', category.imageCategory);
        formData.set('body', JSON.stringify(category));

        const fetching = await fetch("/api/new-category", {
            method: 'POST',
            body: formData
          })
        const data = await fetching.json()


        console.log(data)

    }

    return(
        <>
            <form encType="multipart/form-data">
                <label htmlFor="category">
                    
                    <select name="category" onChange={(e) => setProjetData(prev => ({...prev, categoryName: e.target.value}))} id="category">
                        <option value="Illustration">Illustration</option>
                        <option value="Photographie">Photographie</option>
                    </select>
                </label>

                <label htmlFor="projetName">
                    <input type="text" name="projetName" id="input" onChange={(e) => setProjetData(prev => ({...prev, projetName: e.target.value}))}/>
                </label>

                <label htmlFor="projetImage">
                    <input type="file" name="projetImage" onChange={(e) =>setProjetData(prev => ({...prev, projetImage: e.target.files[0]}))}/>
                </label>

                <label htmlFor="projetDescription">
                    <input type="text" name="projetDescription" id="input" onChange={(e) => setProjetData(prev => ({...prev, projetDescription: e.target.value}))}/>
                </label>

                <label htmlFor="projetDate">
                    <input type="date" onChange={(e) => setProjetData(prev => ({...prev, projetDate: e.target.value}))}  name="projetDate" />
                </label>

                <label htmlFor="isLarge">
                    <input type="checkbox" onChange={(e) => setProjetData(prev => ({...prev, isLarge: e.target.checked}))}  name="isLarge" />
                </label>

                <label htmlFor="isTall">
                    <input type="checkbox" onChange={(e) => setProjetData(prev => ({...prev, isTall: e.target.checked}))}  name="isTall" />
                </label>

                <button onClick={(e) => sendProject(e)}>Send Projet</button>
            </form>

            <form encType="multipart/form-data">

                <label htmlFor="projetDescription">
                    <input type="text" name="projetDescription" id="input" onChange={(e) => setCategory(prev => ({...prev, categoryName: e.target.value}))}/>
                </label>

                <label htmlFor="projetDate">
                    <input type="file" onChange={(e) => setCategory(prev => ({...prev, imageCategory: e.target.files[0]}))}  name="projetDate" />
                </label>

                <button onClick={(e) => sendCategory(e)}>Send Category</button>
            </form>
        </>
    )
}
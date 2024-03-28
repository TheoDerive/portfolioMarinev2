'use client'

import React from "react"
import axios from "axios"

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

    const sendProject = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('file', projetData.projetImage);
        formData.set('body', JSON.stringify(projetData));

        const fetching = await fetch("/api/new-projet", {
            method: 'POST',
            body: formData
          })
        const data = fetching.data


        console.log(data)

    }

    return(
        <>
            <form encType="multipart/form-data">
                <label htmlFor="category">
                    
                    <select name="category" onChange={(e) => setProjetData(prev => ({...prev, categoryName: e.target.value}))} id="category">
                        <option value="test">Test</option>
                        <option value="photographie">Photographie</option>
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

                <button onClick={(e) => sendProject(e)}>Send</button>
            </form>
        </>
    )
}
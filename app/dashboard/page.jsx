'use client'

import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file"
import React from "react"
export default function Dashboard(){
    const [updatedProjet, setUpdatedProjet] = React.useState({
        isShow: false,
        pevCategoryName: '',
        prevProjetName: '',
        prevProjetImage: '',
        prevProjetDescription: '',
        prevProjetDate: "",
        prevIsLarge: false,
        prevIsTall: false,
        categoryName: '',
        projetName: '',
        projetImage: '',
        projetDescription: '',
        projetDate: "",
        isLarge: false,
        isTall: false
    })
    const [updatedCategory, setUpdatedCategory] = React.useState({
        isShow: false,
        categoryName: '',
        newCategoryName: '',
    })
    const [categories, setCategories] = React.useState([])
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

    React.useEffect(() => {
        async function getAllCategories(){
            const data = await fetch('/api/get-all-categories')
            .then(response => response.json())
            .then(datas => datas.data )


            setCategories(data)
        }
        getAllCategories()
    }, [])

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

    const removeCategory = async (e, nameCategory) => {
        e.preventDefault()

        const name = {name: nameCategory}

        const fetching = await fetch('/api/remove-category', {
            method: 'DELETE',
            body: JSON.stringify(name)
        })

        const data = await fetching.json()

        console.log(data)
    }

    const removeProjet = async (e, nameCategory, nameProjet) => {
        e.preventDefault()

        const name = {categorieName: nameCategory, projetName: nameProjet}

        const fetching = await fetch('/api/remove-projet', {
            method: 'DELETE',
            body: JSON.stringify(name)
        })

        const data = await fetching.json()

        console.log(data)
    }

    const updateCategory = async (e, nameCategory, newCategoryName) => {
        e.preventDefault()

        const name = {name: nameCategory, newCategoryName: newCategoryName}

        const fetching = await fetch('/api/update-category', {
            method: 'PUT',
            body: JSON.stringify(name)
        })

        const data = await fetching.json()

        console.log(data)
    }

    const updateProjet = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('file', updatedProjet.projetImage);
        formData.set('body', JSON.stringify(updatedProjet));

        const fetching = await fetch('/api/update-projet', {
            method: 'PUT',
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
                        {
                            categories.map(element => <option value={element.name}>{element.name}</option>)
                        }
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

            <br/>
            <br/>
            <br/>

            {
                categories.map(deleteCategory => <>
                    <p>{deleteCategory.name}</p>
                    <button onClick={(e) => removeCategory(e, deleteCategory.name)}>Remove {deleteCategory.name}</button>
                    <button onClick={(e) => setUpdatedCategory({isShow: true, categoryName: deleteCategory.name, newCategoryName: deleteCategory.name})}>Modifier {deleteCategory.name}</button>

                    <ul>

                        {
                            deleteCategory.content.map(deleteProjet => <li>
                                <p>{deleteProjet.projetName}</p>
                                <button onClick={(e) => removeProjet(e, deleteCategory.name, deleteProjet.projetName)}>Remove {deleteProjet.projetName}</button>
                                <button onClick={(e) => setUpdatedProjet(
                                    {
                                        isShow: true,
                                        prevCategoryName: deleteCategory.name,
                                        prevProjetName: deleteProjet.projetName,
                                        prevProjetImage: deleteProjet.projetImage,
                                        prevProjetDescription: deleteProjet.projetDescription,
                                        prevProjetDate: deleteProjet.projetDate,
                                        prevIsLarge: deleteProjet.isLarge,
                                        prevIsTall: deleteProjet.isTall,
                                        categoryName: deleteCategory.name,
                                        projetName: deleteProjet.projetName,
                                        projetImage: deleteProjet.projetImage,
                                        projetDescription: deleteProjet.projetDescription,
                                        projetDate: deleteProjet.projetDate,
                                        isLarge: deleteProjet.isLarge,
                                        isTall: deleteProjet.isTall
                                    }
                                )}>Modifier {deleteProjet.projetName}</button>
                            </li>)
                        }

                    </ul>
                </>)
            }


            {
                updatedCategory.isShow ?
                    <form encType="multipart/form-data">
                        
                        <h1>{updatedCategory.categoryName}</h1>
                        <button onClick={() => setUpdatedCategory(prev => ({...prev, isShow: false}))}>close</button>
                        <label htmlFor="projetDescription">
                            <input type="text" value={updatedCategory.newCategoryName} name="projetDescription" id="input" onChange={(e) => setUpdatedCategory(prev => ({...prev, newCategoryName: e.target.value}))}/>
                        </label>

                        <label htmlFor="projetDate">
                            <input type="file" onChange={(e) => setCategory(prev => ({...prev, imageCategory: e.target.files[0]}))}  name="projetDate" />
                        </label>

                        <button onClick={(e) => updateCategory(e, updatedCategory.categoryName, updatedCategory.newCategoryName)}>Send Category</button>
                    </form>
                    :
                    null
            }

{
                updatedProjet.isShow ?
                    <form encType="multipart/form-data">
                        <button onClick={() => setUpdatedProjet(prev => ({...prev, isShow: false}))}>close</button>


                        <label htmlFor="category">
                            
                            <select name="category" onChange={(e) => setUpdatedProjet(prev => ({...prev, categoryName: e.target.value}))} id="category">
                                {
                                    categories.map(element => <option value={element.name} selected={updatedProjet.categoryName === element.name}>{element.name}</option>)
                                }
                            </select>
                        </label>

                        <label htmlFor="projetName">
                            <input type="text" value={updatedProjet.projetName} name="projetName" id="input" onChange={(e) => setUpdatedProjet(prev => ({...prev, projetName: e.target.value}))}/>
                        </label>

                        <label htmlFor="projetImage">
                            <input type="file" name="projetImage" onChange={(e) =>setUpdatedProjet(prev => ({...prev, projetImage: e.target.files[0]}))}/>
                        </label>

                        <label htmlFor="projetDescription">
                            <input type="text" name="projetDescription" value={updatedProjet.projetDescription} id="input" onChange={(e) => setUpdatedProjet(prev => ({...prev, projetDescription: e.target.value}))}/>
                        </label>

                        <label htmlFor="projetDate">
                            <input type="date" value={updatedProjet.projetDate} onChange={(e) => setUpdatedProjet(prev => ({...prev, projetDate: e.target.value}))}  name="projetDate" />
                        </label>

                        <label htmlFor="isLarge">
                            <input type="checkbox" checked={updatedProjet.isLarge} onChange={(e) => setUpdatedProjet(prev => ({...prev, isLarge: e.target.checked}))}  name="isLarge" />
                        </label>

                        <label htmlFor="isTall">
                            <input type="checkbox" checked={updatedProjet.isTall} onChange={(e) => setUpdatedProjet(prev => ({...prev, isTall: e.target.checked}))}  name="isTall" />
                        </label>

                        <button onClick={(e) => updateProjet(e)}>Send Projet</button>
                    </form>
                    :
                    null
            }

        </>
    )
}
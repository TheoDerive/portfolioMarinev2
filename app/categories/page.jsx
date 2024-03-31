'use client'

import React from 'react'

import '../../style/style.scss'
import { hoverElement, unHoverElement } from '@/components/Cursor'

export default function Projets(){
    const [categories, setCategories] = React.useState([])
    const [scroll, setScroll] = React.useState(0)

    React.useEffect(() => {
        async function getAllCategories(){
            const data = await fetch('/api/get-all-categories')
            .then(response => response.json())
            .then(datas => datas.data )


            setCategories(data)
            
            console.log(data)
        }
        getAllCategories()
    }, [])

    return(
        <>
            <nav>
                <a href="/" onMouseEnter={() => hoverElement('texts')} onMouseLeave={() => unHoverElement()} className="close"></a>

                <button className="next" onMouseEnter={() => hoverElement('texts')} onMouseLeave={() => unHoverElement()}  onClick={() => scroll === categories.length - 1 ? setScroll(0) : setScroll(prev => prev+1)}></button>
                <button className="prev" onMouseEnter={() => hoverElement('texts')} onMouseLeave={() => unHoverElement()}  onClick={() => scroll <= 0 ? setScroll(categories.length - 1) : setScroll(prev => prev-1)}></button>
            </nav>
            <main className="projects-section" style={{width: `${categories.length * 100}vw`}}>
                <ul className="projects-container"  onMouseEnter={() => hoverElement('buttons')} onMouseLeave={() => unHoverElement()}  style={{transform: `translateX(-${scroll * 100}vw)`}}>
                    {
                        categories.map(categorie => 
                            <a href={`/categories/${categories.name}`} className='project-container'>
                                <h2 className="categorie-name"><strong>{categorie.name}</strong></h2>

                                <section className="projects-show-container">
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                </section>

                                <section className="projects-show-container">
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                </section>

                                <section className="projects-show-container">
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                    {
                                        categorie.content.map(projet =>
                                            <article className='projet-image-container' style={{backgroundImage: `url(${projet.projetImage})`}}>
                                            </article>
                                        )
                                    }
                                </section>
                            </a>
                        )
                    }
                </ul>
            </main>
        </>
    )
}
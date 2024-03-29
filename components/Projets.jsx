'use client'

import React from "react"
import { hoverElement, unHoverElement } from "./Cursor"

export function ProjetsHomepage(){
    const [projets, setProjets] = React.useState([])

    let images = [
        "https://www.marine-sicaud.fr/assets/photo/londonRose.jpg",
        "https://www.marine-sicaud.fr/assets/photo/light.jpg",
        "https://www.marine-sicaud.fr/assets/photo/londonRose.jpg",
        "https://www.marine-sicaud.fr/assets/photo/light.jpg",
    ]

    React.useEffect(() => {
        
        async function getAllCategories(){
            const array = []
            const data = await fetch('/api/get-all-categories')
            .then(response => response.json())
            .then(datas => datas.data )

            data.forEach(element => {
                element.content.forEach(projet => {
                    array.push(projet)
                })

            });
            setProjets(array)
        }
        getAllCategories()
    }, [])

    // Get scroll position
    React.useEffect(() => {

        function transform(section){
            const offsetTop = section.parentElement.offsetTop
            const scrollSection = section.querySelector('.scroll-projets')
            let pourcentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100
            pourcentage = pourcentage < 0 ? 0 : pourcentage > 200 ? 200 : pourcentage
            scrollSection.style.transform = `translate3d(${-(pourcentage)}vw, 0, 0)`
        }

        function handleScroll(e) {
            const stickySection = document.querySelector('.projets')

            transform(stickySection)
        }


        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <section id="projets" className="projets-container">
            <div className="projets">
                <div className="scroll-projets">

                    {
                        projets.map(projet => <article className="projet-homepage" onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()}>
                            <img src={projet.projetImage} alt="image"/>
                            <span> <span className="barre"></span>{projet.projetName}</span>
                        </article>)
                    }

                </div>
            </div>
        </section>
    )
}
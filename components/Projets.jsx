'use client'

import React from "react"
import { hoverElement, unHoverElement } from "./Cursor"

export function ProjetsHomepage(){

    let images = [
        "https://www.marine-sicaud.fr/assets/photo/londonRose.jpg",
        "https://www.marine-sicaud.fr/assets/photo/light.jpg",
        "https://www.marine-sicaud.fr/assets/photo/londonRose.jpg",
        "https://www.marine-sicaud.fr/assets/photo/light.jpg",
    ]


    React.useEffect(() => {

        function transform(section){
            const offsetTop = section.parentElement.offsetTop
            const scrollSection = section.querySelector('.scroll-projets')
            let pourcentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100
            console.log(pourcentage)
            pourcentage = pourcentage < 0 ? 0 : pourcentage > 200 ? 200 : pourcentage
            scrollSection.style.transform = `translate3d(${-(pourcentage)}vw, 0, 0)`
            console.log(pourcentage)
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
                        images.map(image => <article className="projet-homepage" onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()}>
                            <img src={image} alt="image"/>
                            <span> <span className="barre"></span> Photo Ombres / Lumières</span>
                        </article>)
                    }

                </div>
            </div>
        </section>
    )
}
'use client'

import React from "react";
import { hoverElement, unHoverElement } from "./Cursor";

export default function Nav(){
    const [isDynamique, setIsDynamique] = React.useState(true)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        const navElement = document.querySelector('.nav-classic')
        const competencesContainer = document.querySelector('#competences')
        let checkout = false

        function scrollNav(){
            const offsetTop = competencesContainer.offsetTop
            let pourcentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100
<<<<<<< HEAD
=======
            console.log(pourcentage)
>>>>>>> df9379faaa64823a08c4ea9ef0ff911a5f9cc5d7

            if(pourcentage > -10){
                checkout = true

                navElement.classList.add('nav-classic-scroll')
                setIsDynamique(false)
            }else{
                navElement.classList.remove('nav-classic-scroll')
                setIsDynamique(true)
            }

        }

        window.addEventListener('scroll', scrollNav)

        return () => {
            window.removeEventListener('scroll', scrollNav)  
        }
    })


    return(
        <nav className="nav-classic">
            <div></div>
            <section className={isDynamique ? "dynamique-island" : 'normal-nav'}>

                <a href="/"  onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()}  className="nav-classic-image">
                    <img src="/assets/logoMarineBlack.svg" alt="logo Marine" />
                </a>

                <ul className={`nav-classic-onglet-container ${isOpen ? 'nav-classic-onglet-container-open' : null}`}>
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} className="nav-classic-onglet"><a href="#">Acceuil</a></li>
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} className="nav-classic-onglet"><a href="#">Projets</a></li>
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} className="nav-classic-onglet"><a href="#">A propos</a></li>
                </ul>
            </section>

            <a href="#" className="nav-classic-button" onMouseEnter={() => hoverElement('buttons')} onMouseLeave={() => unHoverElement()}>Contact</a>
        </nav>
    )
}
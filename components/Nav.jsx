'use client'

import { hoverElement, unHoverElement } from "./Cursor";

export default function Nav(){
    return(
        <nav class="nav-classic">
            <div></div>
            <section class="dynamique-island">
                <img src="./assets/logo.png" alt="logo Marine" class="nav-classic-image" />

                <ul class="nav-classic-onglet-container">
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} class="nav-classic-onglet"><a href="#">Acceuil</a></li>
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} class="nav-classic-onglet"><a href="#">Projets</a></li>
                    <li onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()} class="nav-classic-onglet"><a href="#">A propos</a></li>
                </ul>
            </section>

            <a href="#" class="nav-classic-button" onMouseEnter={() => hoverElement('buttons')} onMouseLeave={() => unHoverElement()}>Contact</a>
        </nav>
    )
}
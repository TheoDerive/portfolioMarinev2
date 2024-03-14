'use client'

import { hoverElement, unHoverElement } from "./Cursor";

export default function Nav(){
    return(
        <nav class="nav-classic">
            <div></div>
            <section class="dynamique-island">

                <a href="/"  onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()}  class="nav-classic-image">
                    <img src="/assets/logoMarineBlack.svg" alt="logo Marine" />
                    </a>
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
'use client'

import React from "react"

export default function Cursor(){
    const [mousePosition, setMousePosition] = React.useState({
        x: 0,
        y: 0
    })

    React.useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener('mousemove', mouseMove)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
        }
    }, [])


    return <div className="cursor" style={{top: `${mousePosition.y}px`, left: `${mousePosition.x}px`}}></div>
}



// Actions with cursor

export function hoverElement(element){
    const curseur = document.querySelector('.cursor')


    switch (element) {
        case 'links':
            curseur.style.backgroundColor = 'transparent'      
            curseur.style.width = '40px'      
            curseur.style.height = '40px'      
            break;

        case 'buttons':
            curseur.style.backgroundColor = 'transparent'      
            curseur.style.borderColor = 'white'      
            curseur.style.width = '40px'      
            curseur.style.height = '40px'      
            break;

        case 'texts':
            curseur.style.backgroundColor = 'white'
            curseur.style.width = '30px'      
            curseur.style.height = '30px' 
            break;
    
        default:
            break;
    }
}

export function unHoverElement(){
    const curseur = document.querySelector('.cursor')

    curseur.style.backgroundColor = 'black'      
    curseur.style.borderColor = 'black'      
    curseur.style.width = '20px'      
    curseur.style.height = '20px' 
}
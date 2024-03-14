import React from "react"

export default function Competances(){
    const [competances, setCompetances] = React.useState([])

    React.useEffect(() => {
        const getCompetances = async () => {

            // Récuration des compétances
            const response = await fetch('/api/get-competances')
            .then(res => res.json())
            .then(data => data)

            setCompetances(response)
        }

        getCompetances()
    }, [])

    return (
        <section id="competances">


            <ul className="competances-homepage-container">
                {
                    competances.map(competance => 
                        <li className="competances-homepage" key={competance.id}>
                            <img src={competance.image} alt={`${competance.name} image`} className="competance-homepage-image" />

                            <span>{competance.name}</span>
                        </li>    
                    )
                }
            </ul>
        </section>
    )
}
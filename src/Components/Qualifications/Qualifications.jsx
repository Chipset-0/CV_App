import { useState } from 'react'
import './Qualifications.css'

export default function Qualifications()
{
    //CV Values
    const [qualificationData, setQualificationData] = useState({
        name: "Name",
        address: "Address",
        email: "place.holder@gmail.com",
        phone: "+00 000 000 000",
        linkedIn: "https://www.linkedin.com/in/placeholder/",
        git: "https://github.com/placeholder"

    })

    //Editing State Values
    const [isEditingQualification, setIsEditingQualification] = useState(false)

    return (
        <div>
            {isEditingQualification ? (
                <QualificationEdit 
                    qualificationData={qualificationData}
                    setQualificationData={setQualificationData}
                    setIsEditingQualification={setIsEditingQualification}
                />
            ) : (<QualificationText 
                    qualificationData={qualificationData}
                    setIsEditingQualification={setIsEditingQualification}
                />)
        }
        </div>
    )
}

function QualificationEdit({qualificationData, setQualificationData, setIsEditingQualification})
{    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingQualification(false)
    }

    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name

        const value = e.target.value

        setQualificationData(qualificationData => ({ ...qualificationData, [name]:value}))
    }

    return(
        <div>
            <form className='qualification-form' onSubmit={handleSubmit}>
            </form>
        </div>
    );
}


function QualificationText({qualificationData, setIsEditingQualification})
{
    const [qualificationIsHovered, setQualificationIsHovered] = useState(false)

    return(
        <div className="qualification-options-container" onMouseEnter={() => setQualificationIsHovered(true)} onMouseLeave={() => setQualificationIsHovered(false)}>

        </div>
    )
}


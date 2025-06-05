import { useState } from 'react'
import './Qualifications.css'

export default function Qualifications()
{
    //CV Values
    const [qualificationData, setQualificationData] = useState([QualificationObjectFactory()])

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

function QualificationObjectFactory(title="Title", date="1815", source="Placeholder Place", detail="Placeholder")
{
    return {
        title: title,
        date: date,
        source: source,
        detail: detail
    }
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

function QualificationContainerText({qualification})
{
    return(
        <div className='qualification-container'>
            <div className='container-left'>
                <div className="qualification-title">{qualification.title}</div>
                <div className="qualification-text">{qualification.source}</div>
                <div className="qualification-text">{qualification.detail}</div>
            </div>
            <div className='container-right'>
                <div className='qualification-date'>{qualification.date}</div>
            </div>
        </div>
    )
}

function QualificationText({qualificationData, setIsEditingQualification})
{
    const [qualificationIsHovered, setQualificationIsHovered] = useState(false)

    return(
        <div className="qualification-options-container" onMouseEnter={() => setQualificationIsHovered(true)} onMouseLeave={() => setQualificationIsHovered(false)}>
            {qualificationData.map(qualification => (
                <QualificationContainerText qualification={qualification}/>
            ))}
            <div className={`qualification-edit-button-container ${qualificationIsHovered ? "" : "hide"}`}>
                <button id="qualification-edit-toggle" onClick={() => console.log("Entered", qualificationIsHovered)}>Edit?</button>
            </div>
        </div>
    )
}


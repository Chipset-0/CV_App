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

function QualificationObjectFactory(title="Title", date="YYYY", source="Placeholder Place", detail="Placeholder")
{
    return {
        title: title,
        date: date,
        source: source,
        detail: detail
    }
}

function QualificationContainerEdit({qualification})
{

    return(
        <div className='qualification-container'>
            <div className='container-vertical'>
                <div className="qualification-title">{qualification.title}</div>
                <div className='qualification-date'>{qualification.date}</div>
                <div className="qualification-text">{qualification.source}</div>
                <div className="qualification-text">{qualification.detail}</div>
            </div>
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
            {qualificationData.map(qualification => (
                <QualificationContainerEdit qualification={qualification}/>
            ))}
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
            {qualificationData.map((qualification, i) => (
                <QualificationContainerText qualification={qualification} key={i}/>
            ))}
            <div className={`qualification-edit-button-container ${qualificationIsHovered ? "" : "hide"}`}>
                <button id="qualification-edit-toggle" onClick={() => setIsEditingQualification(true)}>Edit?</button>
            </div>
        </div>
    )
}


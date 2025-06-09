import { useState } from 'react'
import './Qualifications.css'
import '../UniversalStyling.css'

export default function Qualifications()
{
    //CV Values
    const [qualificationData, setQualificationData] = useState([QualificationObjectFactory()])

    //Editing State Values
    const [isEditingQualification, setIsEditingQualification] = useState(false)

    return (
        <div className='section'>
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

function QualificationObjectFactory(title="Title", date="YYYY", source="Placeholder Place", detail="A")
{
    return {
        title: title,
        date: date,
        source: source,
        detail: detail
    }
}


function QualificationContainerEdit({qualificationData, setQualificationData, index})
{
    const qualification = qualificationData[index];

    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name

        const value = e.target.value

        const updated = {...qualification, [name]:value};

        setQualificationData(qualificationData.map((item, i) => i == index ? updated : item));
        
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }
    const deleteQualification = () =>
    {
        setQualificationData(qualificationData.filter((_, i) => i !== index));
    }

    return(
        <div className='qualification-edit-container'>
            <form class='qualification-edit-form' onSubmit={handleSubmit}>
                <input  className="qualification-title" name="title" placeholder={qualification.title}  onChange={handleChange}/>
                <input  className='qualification-date' name="date"   placeholder={qualification.date}   onChange={handleChange} />
                <input  className="qualification-text" name="source" placeholder={qualification.source} onChange={handleChange} />
                <input  className="qualification-text" name="detail" placeholder={qualification.detail} onChange={handleChange} />
                <div>
                    <button type="submit" className='submit-button'>Save</button>
                    <button type="button" className='delete-button' onClick={deleteQualification}>Delete</button>
                </div>
            </form>
        </div>
    )
}


function QualificationEdit({qualificationData, setQualificationData, setIsEditingQualification})
{    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingQualification(false)
    }


    const addQualification = () =>
    {
        setQualificationData(qualificationData => [...qualificationData, QualificationObjectFactory()])
    }

    return(
        <div className='qualification-options-container cv-section-margin'>
            {qualificationData.map((qualification, i) => (
                <QualificationContainerEdit qualificationData={qualificationData} setQualificationData={setQualificationData} index={i}/>
            ))}
            <div class="qualification-edit-buttons-container">
                <button id="add-qualification-button" onClick={addQualification}>Add</button>
                <button id="finish-edit-qualification-button" onClick={handleSubmit}>Finish</button>
            </div>
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
                <div className={`qualification-text ${qualification.detail.length == 0 ? "hide" : ""}`}>{qualification.detail}</div>
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
        <div className="qualification-options-container cv-section-margin" onMouseEnter={() => setQualificationIsHovered(true)} onMouseLeave={() => setQualificationIsHovered(false)}>
            <h3 className='section-header'>Qualifications</h3>
            {qualificationData.map((qualification, i) => (
                <QualificationContainerText qualification={qualification} key={i}/>
            ))}
            <div className={`qualification-edit-button-container ${qualificationIsHovered ? "" : "hide"}`}>
                <button id="qualification-edit-toggle" onClick={() => setIsEditingQualification(true)}>Edit?</button>
            </div>
        </div>
    )
}


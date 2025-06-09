import { useState } from 'react'
import './AdditionalSkills.css'

const PLACEHOLDER = "Placeholder"

export default function AdditionalSkills()
{
    const [additionalData, setAdditionalData] = useState([PLACEHOLDER])

    const [isEditingAdditionalSkills, setIsEditingAdditionalSkills] = useState(false)

    return (
        <div className='section'>
            {isEditingAdditionalSkills ? (
                <AdditionalEdit 
                    additionalData={additionalData}
                    setAdditionalData={setAdditionalData}
                    setIsEditingAdditionalSkills={setIsEditingAdditionalSkills}/>
            ) : (
                <AdditionalText 
                    additionalData={additionalData}
                    setIsEditingAdditionalSkills={setIsEditingAdditionalSkills}/>
            )}
        </div>
    )
}


function AdditionalText({additionalData, setIsEditingAdditionalSkills})
{
    const [additionalIsHovered, setAdditionalIsHovered] = useState(false)

    return (
        <div className='add-skill-options-container cv-section-margin' onMouseEnter={() => setAdditionalIsHovered(true)} onMouseLeave={() => setAdditionalIsHovered(false)}>
            <h3 className='section-header'>Additional Skills</h3>
            <ul>
                {additionalData.map((skill, i) => (<li key={i} className='skill-container'>{skill}</li>
                ))}
            </ul>
            <div className={` ${additionalIsHovered ? "" : "hide"} add-skill-edit-button-container`}>
                <button id="add-skill-edit-toggle" onClick={() => setIsEditingAdditionalSkills(true)}>Edit</button>
            </div>
        </div>
    )
}

function AdditionalContainerEdit({additionalData, setAdditionalData, index})
{
    const skill = additionalData[index];

    const handleChange = (e) => {
        
        const value = e.target.value
        
        setAdditionalData(additionalData.map((item, i) => i == index ? value : item));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }

    const deleteAdditional = () => 
    {
        setAdditionalData(additionalData.filter((_, i) => i !== index))
    }

    return(
        <div className='add-skill-container-edit'>
            <form className='add-skill-edit-form' onSubmit={handleSubmit}>
                <input className='add-skill-skill' name="skill" placeholder={skill.skills} onChange={handleChange}/>
                <div className="add-skill-input-buttons">
                    <button type="submit" className='submit-button save-button'>Save</button>
                    <button type="button" className='delete-button' onClick={deleteAdditional}>Delete</button>
                </div>
            </form>
        </div>
    )
}

function AdditionalEdit({additionalData, setAdditionalData, setIsEditingAdditionalSkills})
{
    const addAdditionalSkill = () => {
        setAdditionalData(additionalData => [...additionalData, PLACEHOLDER]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingAdditionalSkills(false);
    }

    return (
        <div className='add-skill-options-container cv-section-margin'>
            {additionalData.map((_, i) => (
                <AdditionalContainerEdit additionalData={additionalData} setAdditionalData={setAdditionalData} index={i} key={i} />
            ))}
            <div className="qualification-edit-buttons-container">
                <button id="add-qualification-button" onClick={addAdditionalSkill}>Add</button>
                <button id="finish-edit-qualification-button" onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    )
}
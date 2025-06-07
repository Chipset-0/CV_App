import { useState } from 'react'
import './TechnicalSkills.css'

export default function TechnicalSkills()
{
    const [technicalData, setTechnicalData] = useState([TechnicalObjectFactory()])

    const [isEditingTechnicalSkills, setIsEditingTechnicalSkills] = useState(false)

    return (
        <div>
            {isEditingTechnicalSkills ? (
                <TechnicalEdit 
                    technicalData={technicalData}
                    setTechnicalData={setTechnicalData}
                    setIsEditingTechnicalSkills={setIsEditingTechnicalSkills}/>
            ) : (
                <TechnicalText 
                    technicalData={technicalData}
                    setIsEditingTechnicalSkills={setIsEditingTechnicalSkills}/>
            )}
        </div>
    )
}

function TechnicalObjectFactory(type="Placeholder", skills="x,y,z")
{
    return (
        {
            type: type,
            skills: skills
        }
    );
}

function TechnicalContainerText({skill})
{
    return(
        <div className='technical-container'>
            <div className='technical-title'>{skill.type}:</div>
            <div className='technical-list'>{skill.skills}</div>
        </div>
    )
}

function TechnicalText({technicalData, setIsEditingTechnicalSkills})
{
    const [technicalIsHovered, setTechnicalIsHovered] = useState(false)

    return (
        <div className='technical-options-container cv-section-margin' onMouseEnter={() => setTechnicalIsHovered(true)} onMouseLeave={() => setTechnicalIsHovered(false)}>
            <h3 className='section-header'>Technical Skills</h3>
            {technicalData.map((skill, i) => (
                <TechnicalContainerText skill={skill} key={i}/>
            ))}
            <div className={`technical-edit-button-container ${technicalIsHovered ? "" : "hide"}`}>
                <button id="technical-edit-toggle" onClick={() => setIsEditingTechnicalSkills(true)}>Edit</button>
            </div>
        </div>
    )
}

function TechnicalContainerEdit({technicalData, setTechnicalData, index})
{
    const skill = technicalData[index];

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        const updated = {...skill, [name]:value};
        console.log(updated)
        setTechnicalData(technicalData.map((item, i) => i == index ? updated : item));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }

    const deleteTechnical = () => 
    {
        setTechnicalData(technicalData.filter((_, i) => i !== index))
    }

    return(
        <div className='technical-container-edit'>
            <form className='technical-edit-form' onSubmit={handleSubmit}>
                <div class="technical-input">
                    <input className='technical-type' name="type" placeholder={skill.type} onChange={handleChange}/>
                    <input className='technical-skills' name="skills" placeholder={skill.skills} onChange={handleChange}/>
                </div>
                <div class="technical-input-buttons">
                    <button type="submit" className='submit-button save-button'>Save</button>
                    <button type="button" className='delete-button' onClick={deleteTechnical}>Delete</button>
                </div>
            </form>
        </div>
    )
}

function TechnicalEdit({technicalData, setTechnicalData, setIsEditingTechnicalSkills})
{
    const addTechnicalSkill = () => {
        setTechnicalData(technicalData => [...technicalData, TechnicalObjectFactory()]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingTechnicalSkills(false);
    }

    return (
        <div className='technical-options-container cv-section-margin'>
            {technicalData.map((skill, i) => (
                <TechnicalContainerEdit technicalData={technicalData} setTechnicalData={setTechnicalData} index={i} key={i} />
            ))}
            <div className="qualification-edit-buttons-container">
                <button id="add-qualification-button" onClick={addTechnicalSkill}>Add</button>
                <button id="finish-edit-qualification-button" onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    )
}
import { useState } from 'react'
import './AdditionalWorkExperience.css'
import '../UniversalStyling.css'


export default function AdditionalWorkExperience()
{
    //CV Values
    const [addWorkData, setAddWorkData] = useState([AddWorkObjectFactory()])

    //Editing State Values
    const [isEditingAddWork, setIsEditingAddWork] = useState(false)

    return (
        <div>
            {isEditingAddWork ? (
                <AddWorkEdit
                    addWorkData={addWorkData}
                    setAddWorkData={setAddWorkData}
                    setIsEditingAddWork={setIsEditingAddWork} />
            ) : (
                <AddWorkText
                    addWorkData={addWorkData}
                    setIsEditingAddWork={setIsEditingAddWork} />
            )
            }
        </div>
    )
}

function AddWorkObjectFactory(title="Position", period="MM/YYYY - MM/YYYY", 
    location="Placeholder Location", details=['detail 1', 'detail 2', 'detail 3'])
{
    return {
        title: title,
        period: period,
        location: location,
        details: details
    }
}

function AddWorkContainerEdit({addWorkData, setAddWorkData, index})
{
    const work = addWorkData[index];

    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;

        const value = e.target.value;

        const updated = {...work, [name]:value};

        setAddWorkData(addWorkData.map((item, i) => i == index ? updated : item));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }
    const deleteWork = () =>
    {
        setAddWorkData(addWorkData.filter((_, i) => i !== index))
    }

    const updateDetail = (e) => 
    {
        const value = e.target.value;
        const key = parseInt(e.target.getAttribute("data-index"));

        console.log(value, key, e.target)

        const updated = {...work, details:work.details.map((detail, i) => i == key ? value : detail)}

        setAddWorkData(addWorkData.map((item, i) => i == index ? updated : item));
    }

    const addDetail = (e) => 
    {
        const updated = {...work, details: [...work.details, `detail ${work.details.length+1}`]}

        setAddWorkData(addWorkData.map((item, i) => i == index ? updated : item));
    }

    const removeDetail = (e) =>
    {
        const key = parseInt(e.target.getAttribute("data-index"));
        const updated = {...work, details: work.details.filter((_, i) => i !== key)}
        setAddWorkData(addWorkData.map((item, i) => i == index ? updated : item));
    }

    console.log(work.details)

    return (
        <div className='addwork-edit-container'>
            <form className='addwork-edit-form' onSubmit={handleSubmit}>
                <input className="addwork-title" name="title" placeholder={work.title} onChange={handleChange} />
                <input className="addwork-period" name="period" placeholder={work.period} onChange={handleChange} />
                <input className="addwork-location" name="location" placeholder={work.location} onChange={handleChange} />
                <div className='addwork-details-container'>
                    {work.details.map((detail, i) => (
                        <div key={i} class="detail-container">
                            <input className='addwork-detail' name="detail" data-index={i} placeholder={detail} onChange={updateDetail} />
                            <button className='addwork-detail-delete-button delete-button' data-index={i} onClick={removeDetail}>Delete</button>
                        </div>
                    ))}
                    <div>
                        <button className="add-addwork-button" onClick={addDetail}>Add</button>
                    </div>
                </div>
                <div>
                    <button type="submit" className='submit-button'>Save</button>
                    <button type="button" className='delete-button' onClick={deleteWork}>Delete</button>
                </div>
            </form>
        </div>
    )
}

function AddWorkEdit({addWorkData, setAddWorkData, setIsEditingAddWork})
{
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingAddWork(false);
    }

    const addAddWork = () =>
    {
        setAddWorkData(addWorkData => [...addWorkData, AddWorkObjectFactory()])
    }

    return(
        <div className='addwork-options-container cv-section-margin'>
            {addWorkData.map((work, i) => (
                <AddWorkContainerEdit addWorkData={addWorkData} setAddWorkData={setAddWorkData}
                setIsEditingAddWork={setIsEditingAddWork} index={i} key={i}/>
            ))}
            <div className="addwork-edit-buttons-container">
                <button id="add-addwork-button" onClick={addAddWork}>Add</button>
                <button id="finish-edit-addwork-button" onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    )
}

function DetailContainerText({detail})
{
    return (
        <li>{detail}</li>
    )
}

function AddWorkContainerText({work})
{
    return (
        <div className="addwork-container">
            <div className="addwork-container-header">
                <div className="addwork-title">{work.title}</div>
                <div className="addwork-date">{work.period}</div>
            </div>
            <div className="addwork-location">{work.location}</div>
            <ul className="addwork-details">
                {work.details.map((detail, i) => (
                    <DetailContainerText detail={detail} key={i}/>
                ))}
            </ul>
        </div>
    )
}

function AddWorkText({addWorkData, setIsEditingAddWork})
{
    const [addWorkIsHovered, setAddWorkIsHovered] = useState(false);

    return(
        <div className='addwork-options-container cv-section-margin' onMouseEnter={() =>setAddWorkIsHovered(true)} onMouseLeave={() =>setAddWorkIsHovered(false)}>
            <h3 className='section-header'>Additional Work Experience</h3>
            {addWorkData.map((work, i) => (
                <AddWorkContainerText work={work} key={i}/>
            ))}
            <div className={`addwork-edit-button-container ${addWorkIsHovered ? "" : "hide"}`}>
                <button id="addwork-edit-toggle" onClick={() => setIsEditingAddWork(true)}>Edit</button>
            </div>
        </div>
    )
}
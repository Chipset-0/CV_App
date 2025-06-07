import { useState } from 'react'
import './RelatedWorkExperience.css'
import '../UniversalStyling.css'


export default function RelevantWorkExperience()
{
    //CV Values
    const [relWorkData, setRelWorkData] = useState([RelWorkObjectFactory()])

    //Editing State Values
    const [isEditingRelWork, setIsEditingRelWork] = useState(false)

    return (
        <div>
            {isEditingRelWork ? (
                <RelWorkEdit
                    relWorkData={relWorkData}
                    setRelWorkData={setRelWorkData}
                    setIsEditingRelWork={setIsEditingRelWork} />
            ) : (
                <RelWorkText
                    relWorkData={relWorkData}
                    setIsEditingRelWork={setIsEditingRelWork} />
            )
            }
        </div>
    )
}

function RelWorkObjectFactory(title="Position", period="MM/YYYY - MM/YYYY", 
    location="Placeholder Location", details=['detail 1', 'detail 2', 'detail 3'])
{
    return {
        title: title,
        period: period,
        location: location,
        details: details
    }
}

function RelWorkContainerEdit({relWorkData, setRelWorkData, index})
{
    const work = relWorkData[index];

    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;

        const value = e.target.value;

        const updated = {...work, [name]:value};

        setRelWorkData(relWorkData.map((item, i) => i == index ? updated : item));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }
    const deleteWork = () =>
    {
        setRelWorkData(relWorkData.filter((_, i) => i !== index))
    }

    const updateDetail = (e) => 
    {
        const value = e.target.value;
        const key = parseInt(e.target.getAttribute("data-index"));

        console.log(value, key, e.target)

        const updated = {...work, details:work.details.map((detail, i) => i == key ? value : detail)}

        setRelWorkData(relWorkData.map((item, i) => i == index ? updated : item));
    }

    const addDetail = (e) => 
    {
        const updated = {...work, details: [...work.details, `detail ${work.details.length+1}`]}

        setRelWorkData(relWorkData.map((item, i) => i == index ? updated : item));
    }

    const removeDetail = (e) =>
    {
        const key = parseInt(e.target.getAttribute("data-index"));
        const updated = {...work, details: work.details.filter((_, i) => i !== key)}
        setRelWorkData(relWorkData.map((item, i) => i == index ? updated : item));
    }

    console.log(work.details)

    return (
        <div className='relwork-edit-container'>
            <form className='relwork-edit-form' onSubmit={handleSubmit}>
                <input className="relwork-title" name="title" placeholder={work.title} onChange={handleChange} />
                <input className="relwork-period" name="period" placeholder={work.period} onChange={handleChange} />
                <input className="relwork-location" name="location" placeholder={work.location} onChange={handleChange} />
                <div className='relwork-details-container'>
                    {work.details.map((detail, i) => (
                        <div key={i} class="detail-container">
                            <input className='relwork-detail' name="detail" data-index={i} placeholder={detail} onChange={updateDetail} />
                            <button className='relwork-detail-delete-button delete-button' data-index={i} onClick={removeDetail}>Delete</button>
                        </div>
                    ))}
                    <div>
                        <button className="add-relwork-button" onClick={addDetail}>Add</button>
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

function RelWorkEdit({relWorkData, setRelWorkData, setIsEditingRelWork})
{
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingRelWork(false);
    }

    const addRelWork = () =>
    {
        setRelWorkData(relWorkData => [...relWorkData, RelWorkObjectFactory()])
    }

    return(
        <div className='relwork-options-container cv-section-margin'>
            {relWorkData.map((work, i) => (
                <RelWorkContainerEdit relWorkData={relWorkData} setRelWorkData={setRelWorkData}
                setIsEditingRelWork={setIsEditingRelWork} index={i} key={i}/>
            ))}
            <div className="relwork-edit-buttons-container">
                <button id="add-relwork-button" onClick={addRelWork}>Add</button>
                <button id="finish-edit-relwork-button" onClick={handleSubmit}>Finish</button>
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

function RelWorkContainerText({work})
{
    return (
        <div className="relwork-container">
            <div className="relwork-container-header">
                <div className="relwork-title">{work.title}</div>
                <div className="relwork-date">{work.period}</div>
            </div>
            <div className="relwork-location">{work.location}</div>
            <ul className="relwork-details">
                {work.details.map((detail, i) => (
                    <DetailContainerText detail={detail} key={i}/>
                ))}
            </ul>
        </div>
    )
}

function RelWorkText({relWorkData, setIsEditingRelWork})
{
    const [relWorkIsHovered, setRelWorkIsHovered] = useState(false);

    return(
        <div className='relwork-options-container cv-section-margin' onMouseEnter={() =>setRelWorkIsHovered(true)} onMouseLeave={() =>setRelWorkIsHovered(false)}>
            <h3 className='section-header'>Related Work Experience</h3>
            {relWorkData.map((work, i) => (
                <RelWorkContainerText work={work} key={i}/>
            ))}
            <div className={`relwork-edit-button-container ${relWorkIsHovered ? "" : "hide"}`}>
                <button id="relwork-edit-toggle" onClick={() => setIsEditingRelWork(true)}>Edit</button>
            </div>
        </div>
    )
}
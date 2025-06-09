import { useState } from 'react'
import './Referees.css'
import '../UniversalStyling.css'

export default function Referees()
{
    //CV Values
    const [refereeData, setRefereeData] = useState([RefereeObjectFactory()])

    //Editing State Values
    const [isEditingReferee, setIsEditingReferee] = useState(false)

    return (
        <div>
            {isEditingReferee ? (
                <RefereeEdit 
                    refereeData={refereeData}
                    setRefereeData={setRefereeData}
                    setIsEditingReferee={setIsEditingReferee}
                />
            ) : (<RefereeText 
                    refereeData={refereeData}
                    setIsEditingReferee={setIsEditingReferee}
                />)
        }
        </div>
    )
}

function RefereeObjectFactory(name="Name - Position", workplace="Workplace", email="placeholder@place.com", phone="+00 000 000 000")
{
    return {
        name: name,
        workplace: workplace,
        email: email,
        phone: phone
    }
}


function RefereeContainerEdit({refereeData, setRefereeData, index})
{
    const referee = refereeData[index];

    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name

        const value = e.target.value

        const updated = {...referee, [name]:value};

        setRefereeData(refereeData.map((item, i) => i == index ? updated : item));
        
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }
    const deleteReferee = () =>
    {
        setRefereeData(refereeData.filter((_, i) => i !== index));
    }

    return(
        <div className='referee-edit-container'>
            <form class='referee-edit-form' onSubmit={handleSubmit}>
                <input  className="referee-name" name="name" placeholder={referee.name}  onChange={handleChange}/>
                <input  className='referee-workplace' name="workplace"   placeholder={referee.workplace}   onChange={handleChange} />
                <input  className="referee-text" name="email" placeholder={referee.email} onChange={handleChange} />
                <input  className="referee-text" name="phone" placeholder={referee.phone} onChange={handleChange} />
                <div>
                    <button type="submit" className='submit-button'>Save</button>
                    <button type="button" className='delete-button' onClick={deleteReferee}>Delete</button>
                </div>
            </form>
        </div>
    )
}


function RefereeEdit({refereeData, setRefereeData, setIsEditingReferee})
{    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingReferee(false)
    }


    const addReferee = () =>
    {
        setRefereeData(refereeData => [...refereeData, RefereeObjectFactory()])
    }

    return(
        <div className='referee-options-container cv-section-margin'>
            {refereeData.map((referee, i) => (
                <RefereeContainerEdit refereeData={refereeData} setRefereeData={setRefereeData} index={i}/>
            ))}
            <div class="referee-edit-buttons-container">
                <button id="add-referee-button" onClick={addReferee}>Add</button>
                <button id="finish-edit-referee-button" onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    );
}

function RefereeContainerText({referee})
{
    return(
        <div className='referee-container'>
            <div className='container-left'>
                <div className="referee-name">{referee.name}</div>
                <div className='referee-workplace'>{referee.workplace}</div>
                <div className={`referee-text ${referee.email.length == 0 ? "hide" : ""}`}>{referee.email}</div>
                <div className={`referee-text ${referee.phone.length == 0 ? "hide" : ""}`}>{referee.phone}</div>
            </div>
            <div className='container-right'>
            </div>
        </div>
    )
}

function RefereeText({refereeData, setIsEditingReferee})
{
    const [refereeIsHovered, setRefereeIsHovered] = useState(false)

    return(
        <div className="referee-options-container cv-section-margin" onMouseEnter={() => setRefereeIsHovered(true)} onMouseLeave={() => setRefereeIsHovered(false)}>
            <h3 className='section-header'>Referees</h3>
            {refereeData.map((referee, i) => (
                <RefereeContainerText referee={referee} key={i}/>
            ))}
            <div className={`referee-edit-button-container ${refereeIsHovered ? "" : "hide"}`}>
                <button id="referee-edit-toggle" onClick={() => setIsEditingReferee(true)}>Edit?</button>
            </div>
        </div>
    )
}


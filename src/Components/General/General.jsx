import { useState } from 'react'
import './General.css'


function GeneralEdit({generalData,setGeneralData,setIsEditingGeneral
})

{
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingGeneral(false)
    }

    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name

        const value = e.target.value

        setGeneralData(generalData => ({ ...generalData, [name]:value}))
    }

    return(
        <div class="general-options-container">
            <form className='general-form' onSubmit={handleSubmit}>
                <div class='form-item'>
                    <label htmlFor="general-name-form">Name: </label>
                    <input type='text' id='general-name-form' name='name' placeholder={generalData.name} onChange={handleChange} />
                </div>
                <div class='form-item'>
                    <label htmlFor="general-address-input">Address: </label>
                    <input type='text' id='general-address-input' name='address' placeholder={generalData.address} onChange={handleChange} />
                </div>
                <div class='form-item'>
                    <label htmlFor="general-email-input">Email: </label>
                    <input type='text' id='general-email-input' name='email' placeholder={generalData.email} onChange={handleChange} />
                </div>
                <div class='form-item'>
                    <label htmlFor="general-phone-input">Phone: </label>
                    <input type="text" id="general-phone-input" name="phone" placeholder={generalData.phone} onChange={handleChange} />
                </div>
                <div class='form-item'>
                    <label htmlFor="general-linkedIn-input">LinkedIn: </label>
                    <input type="text" id="general-linkedIn-input" name="linkedIn" placeholder={generalData.linkedIn} onChange={handleChange} />
                </div>
                <div class='form-item'>
                    <label htmlFor="general-git-input">GitHub: </label>
                    <input type="text" id="general-git-input" name="git" placeholder={generalData.git} onChange={handleChange} />
                </div>
                <button class="submit-button">Submit</button>
            </form>
        </div>
    );
}

function GeneralText({generalData, setIsEditingGeneral})
{
    const [generalIsHovered, setGeneralIsHovered] = useState(false)

    return(
        <div className="general-options-container" onMouseEnter={() => setGeneralIsHovered(true)} onMouseLeave={() => setGeneralIsHovered(false)}>
            <h4 id="nameText">{generalData.name}</h4>
            <div id="addressText" className="general-options-text">{generalData.address}</div>
            <div className="text-container-vertical">
                <div id="emailText" className="general-options-text">E:{generalData.email}</div>
                <div id="phoneText" className="general-options-text">P:{generalData.phone}</div>
                <div id="linkedInText" className="general-options-text">LinkedIn:{generalData.linkedIn}</div>
                <div id="githubText" className="general-options-text">Git:{generalData.git}</div>
            </div>
            <div className={`general-edit-button-container ${generalIsHovered ? "" : "hide"}`}>
                <button id="general-edit-toggle" onClick={() => setIsEditingGeneral(true)}>Edit?</button>
            </div>
        </div>
    )
}

export default function General()
{
    //CV Values
    const [generalData, setGeneralData] = useState({
        name: "Name",
        address: "Address",
        email: "place.holder@gmail.com",
        phone: "+00 000 000 000",
        linkedIn: "linkedin.com/in/placeholder/",
        git: "github.com/placeholder"

    })

    //Editing State Values
    const [isEditingGeneral, setIsEditingGeneral] = useState(false)

    return (
        <div>
            {isEditingGeneral ? (
                <GeneralEdit 
                    generalData={generalData}
                    setGeneralData={setGeneralData}
                    setIsEditingGeneral={setIsEditingGeneral}
                />
            ) : (<GeneralText 
                    generalData={generalData}
                    setIsEditingGeneral={setIsEditingGeneral}
                />)
        }
        </div>
    )
}

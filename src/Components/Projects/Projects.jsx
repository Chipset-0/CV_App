import { useState } from 'react'
import './Projects.css'
import '../UniversalStyling.css'

export default function Projects()
{
    //CV Values
    const [projectData, setProjectData] = useState([ProjectObjectFactory()])

    //Editing State Values
    const [isEditingProject, setIsEditingProject] = useState(false)

    return (
        <div className='section'>
            {isEditingProject ? (
                <ProjectEdit
                    projectData={projectData}
                    setProjectData={setProjectData}
                    setIsEditingProject={setIsEditingProject} />
            ) : (
                <ProjectText
                    projectData={projectData}
                    setIsEditingProject={setIsEditingProject} />
            )
            }
        </div>
    )
}

function ProjectObjectFactory(title="Project Title", date="MM/YYYY", 
    relation="Git link / Project Role", details=['detail 1', 'detail 2', 'detail 3'])
{
    return {
        title: title,
        date: date,
        relation: relation,
        details: details
    }
}

function ProjectContainerEdit({projectData, setProjectData, index})
{
    //TODO
    const project = projectData[index];

    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;

        const value = e.target.value;

        const updated = {...project, [name]:value};

        setProjectData(projectData.map((item, i) => i == index ? updated : item));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }
    const deleteWork = () =>
    {
        setProjectData(projectData.filter((_, i) => i !== index))
    }

    const updateDetail = (e) => 
    {
        const value = e.target.value;
        const key = parseInt(e.target.getAttribute("data-index"));

        console.log(value, key, e.target)

        const updated = {...project, details:project.details.map((detail, i) => i == key ? value : detail)}

        setProjectData(projectData.map((item, i) => i == index ? updated : item));
    }

    const addDetail = (e) => 
    {
        const updated = {...project, details: [...project.details, `detail ${project.details.length+1}`]}

        setProjectData(projectData.map((item, i) => i == index ? updated : item));
    }

    const removeDetail = (e) =>
    {
        const key = parseInt(e.target.getAttribute("data-index"));
        const updated = {...project, details: project.details.filter((_, i) => i !== key)}
        setProjectData(projectData.map((item, i) => i == index ? updated : item));
    }

    console.log(project.details)

    return (
        <div className='project-edit-container'>
            <form className='project-edit-form' onSubmit={handleSubmit}>
                <input className="project-title" name="title" placeholder={project.title} onChange={handleChange} />
                <input className="project-period" name="period" placeholder={project.date} onChange={handleChange} />
                <input className="project-location" name="location" placeholder={project.relation} onChange={handleChange} />
                <div className='project-details-container'>
                    {project.details.map((detail, i) => (
                        <div key={i} class="detail-container">
                            <input className='project-detail' name="detail" data-index={i} placeholder={detail} onChange={updateDetail} />
                            <button className='project-detail-delete-button delete-button' data-index={i} onClick={removeDetail}>Delete</button>
                        </div>
                    ))}
                    <div>
                        <button className="add-project-button" onClick={addDetail}>Add</button>
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

function ProjectEdit({projectData, setProjectData, setIsEditingProject})
{
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditingProject(false);
    }

    const addProject = () =>
    {
        setProjectData(projectData => [...projectData, ProjectObjectFactory()])
    }

    return(
        <div className='project-options-container cv-section-margin'>
            {projectData.map((_, i) => (
                <ProjectContainerEdit projectData={projectData} setProjectData={setProjectData}
                setIsEditingProject={setIsEditingProject} index={i} key={i}/>
            ))}
            <div className="project-edit-buttons-container">
                <button id="add-project-button" onClick={addProject}>Add</button>
                <button id="finish-edit-project-button" onClick={handleSubmit}>Finish</button>
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

function ProjectContainerText({project})
{
    return (
        <div className="project-container">
            <div className="project-container-header">
                <div className="project-title">{project.title}</div>
                <div className="project-date">{project.date}</div>
            </div>
            <div className="project-location">{project.relation}</div>
            <ul className="project-details">
                {project.details.map((detail, i) => (
                    <DetailContainerText detail={detail} key={i}/>
                ))}
            </ul>
        </div>
    )
}

function ProjectText({projectData, setIsEditingProject})
{
    const [projectIsHovered, setProjectIsHovered] = useState(false);

    return(
        <div className='project-options-container cv-section-margin' onMouseEnter={() =>setProjectIsHovered(true)} onMouseLeave={() =>setProjectIsHovered(false)}>
            <h3 className='section-header'>Projects</h3>
            {projectData.map((project, i) => (
                <ProjectContainerText project={project} key={i}/>
            ))}
            <div className={`project-edit-button-container ${projectIsHovered ? "" : "hide"}`}>
                <button id="project-edit-toggle" onClick={() => setIsEditingProject(true)}>Edit</button>
            </div>
        </div>
    )
}
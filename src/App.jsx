import { useRef, useState } from 'react'
import { jsPDF } from "jspdf"
import './App.css'
import General from './Components/General/General'
import Qualifications from './Components/Qualifications/Qualifications'
import html2pdf from 'html2pdf.js'
import TechnicalSkills from './Components/Technical/Technical Skills'
import RelevantWorkExperience from './Components/RelatedWorkExperience/RelatedWorkExperience'
import AdditionalWorkExperience from './Components/AdditionalWorkExperience/AdditionalWorkExperience'
import Projects from './Components/Projects/Projects'
import AdditionalSkills from './Components/AdditionalSkills/AdditionalSkills'

function App() {
  const [count, setCount] = useState(0)
  const cvRef = useRef()

  const printCV = () => {
      html2pdf(cvRef.current, {html2canvas: {scale: 2}}).from().save();
  }

  return (
    <>
      <div className="page-title">
          <h1>CV Application</h1>
      </div>
      <div className="cv-display" ref={cvRef}>
          <General />
          <Qualifications />
          <TechnicalSkills />
          <RelevantWorkExperience />
          <AdditionalWorkExperience />
          <Projects />
          <AdditionalSkills />
      </div>
      <div id="page-actions">
          <button id="print-cv " className="page-action-button" onClick={printCV}>Print</button>
      </div>
    </>
  )
}

export default App

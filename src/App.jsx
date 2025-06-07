import { useRef, useState } from 'react'
import { jsPDF } from "jspdf"
import './App.css'
import General from './Components/General/General'
import Qualifications from './Components/Qualifications/Qualifications'
import html2pdf from 'html2pdf.js'
import TechnicalSkills from './Components/Technical/Technical Skills'

function App() {
  const [count, setCount] = useState(0)
  const cvRef = useRef()

  const printCV = () => {
      html2pdf().from(cvRef.current).save();
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
      </div>
      <div id="page-actions">
          <button id="print-cv " className="page-action-button" onClick={printCV}>Print</button>
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import { jsPDF } from "jspdf"
import './App.css'
import General from './Components/General/General'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="page-title">
          <h1>CV Application</h1>
      </div>
      <div className="cv-display">
          <General />
      </div>
      <div className="page-actions">
          <button id="reset-cv " className="page-action-button">Reset</button>
          <button id="print-cv " className="page-action-button">Print</button>
      </div>
    </>
  )
}

export default App

import html2pdf from "html2pdf.js";

export default function printToPDF() {

  console.log("Entered")

  
  const original = document.getElementById("cv-display");
  const clone = original.cloneNode(true);

  
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.left = "-9999px";
  tempContainer.style.top = "0";
  
  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);

  console.log("Entered");

  
  const leeway = 200;
  const pageHeightPx = 1122 - leeway;

  
  const totalHeight = clone.getBoundingClientRect().height;
  const numPages = Math.ceil(totalHeight / pageHeightPx);
  console.log("Total height:", totalHeight, "Estimated pages:", numPages);

  
  let cumulativeHeight = 0;
  const children = Array.from(clone.children);

  children.forEach(child => {
    const childHeight = child.getBoundingClientRect().height;
    cumulativeHeight += childHeight;
    console.log("Cumulative height:", cumulativeHeight);

    if (cumulativeHeight >= pageHeightPx) {
      console.log("PageBreak!");
      child.classList.add('page-break'); 
    }
  });

  const opt = {
    filename: 'CV.pdf',
    html2canvas: { scale: 2 },
    margin: [10, 10],
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  html2pdf().set(opt).from(clone).output('dataurlnewwindow').then(() => {
    
    document.body.removeChild(tempContainer);
  });
}

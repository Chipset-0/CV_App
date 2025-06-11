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
  
  const totalHeight = clone.getBoundingClientRect().height + leeway;

  const totalHeightMMeter = totalHeight * 0.264583;

  const opt = {
    filename: 'CV.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: [210, totalHeightMMeter], orientation: 'portrait' },

  };

  html2pdf().set(opt).from(clone).output('dataurlnewwindow').then(() => {
    
    document.body.removeChild(tempContainer);
  });
}

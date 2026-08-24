"use client";
import { resumeData } from "@/data/resume";

export function generateResumePDF() {
  const { basics, experience, projects, skills, education, certifications } = resumeData;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Saurabh Yadav - Resume</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #1a1a1a; background: white; padding: 32px 40px; line-height: 1.5; }
  h1 { font-size: 26px; font-weight: 700; color: #0e0e0e; letter-spacing: -0.5px; }
  .subtitle { font-size: 13px; color: #555; margin-top: 2px; }
  .contact-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px; font-size: 10.5px; color: #444; }
  .contact-row span { display: flex; align-items: center; gap: 4px; }
  .divider { height: 1.5px; background: #b3452b; margin: 14px 0 10px; }
  .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #b3452b; margin-bottom: 10px; }
  .section { margin-bottom: 18px; }
  .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3px; }
  .role { font-size: 12.5px; font-weight: 600; color: #111; }
  .company { font-size: 11.5px; color: #b3452b; font-weight: 500; }
  .dates { font-size: 10px; color: #888; white-space: nowrap; }
  .tools { font-size: 10px; color: #888; margin-bottom: 5px; }
  ul { padding-left: 14px; }
  li { margin-bottom: 3px; font-size: 10.5px; color: #333; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
  .skill-cat { font-weight: 600; color: #111; font-size: 10.5px; }
  .skill-val { color: #444; font-size: 10.5px; }
  .project-title { font-weight: 600; font-size: 11px; color: #111; }
  .impact { font-size: 10px; color: #b3452b; font-style: italic; margin-top: 2px; }
  .cert-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
  .cert-name { font-weight: 500; font-size: 10.5px; }
  .cert-status { font-size: 10px; color: #888; }
  .edu-row { display: flex; justify-content: space-between; }
  .edu-name { font-weight: 600; font-size: 11.5px; }
  @media print {
    body { padding: 20px 28px; }
    @page { margin: 0.4in; size: A4; }
  }
</style>
</head>
<body>

<h1>${basics.name}</h1>
<div class="subtitle">${basics.title}</div>
<div class="contact-row">
  <span>Phone: ${basics.phone}</span>
  <span>Email: ${basics.email}</span>
  <span>LinkedIn: ${basics.linkedin}</span>
  <span>Location: ${basics.location}</span>
</div>
<div class="divider"></div>

<div class="section">
  <div class="section-title">Summary</div>
  <p style="font-size:10.5px; color:#333; line-height:1.6;">${basics.summary}</p>
</div>

<div class="section">
  <div class="section-title">Experience</div>
  ${experience.map(exp => `
  <div style="margin-bottom:12px;">
    <div class="exp-header">
      <div>
        <div class="role">${exp.role}</div>
        <div class="company">${exp.company} · ${exp.location}</div>
      </div>
      <div class="dates">${exp.dates}</div>
    </div>
    <div class="tools">Tools: ${exp.tools.join(", ")}</div>
    <ul>${exp.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
  </div>`).join("")}
</div>

<div class="section">
  <div class="section-title">Projects</div>
  ${projects.map(proj => `
  <div style="margin-bottom:9px;">
    <div class="exp-header">
      <div class="project-title">${proj.title} <span style="font-weight:400; color:#888;">(${proj.company})</span></div>
      <div style="font-size:10px; color:#888;">${proj.stack.join(", ")}</div>
    </div>
    <ul>${proj.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    <div class="impact">→ ${proj.impact}</div>
  </div>`).join("")}
</div>

<div class="section">
  <div class="section-title">Skills</div>
  <div class="skills-grid">
    ${Object.entries(skills).map(([cat, items]) => `
    <div>
      <span class="skill-cat">${cat}: </span>
      <span class="skill-val">${items.join(", ")}</span>
    </div>`).join("")}
  </div>
</div>

<div class="section">
  <div class="section-title">Certifications</div>
  ${certifications.map(cert => `
  <div class="cert-row">
    <div class="cert-name">${cert.name}</div>
    <div class="cert-status">${cert.status}</div>
  </div>
  <div style="font-size:10px; color:#888; margin-bottom:5px;">${cert.skills}</div>
  `).join("")}
</div>

<div class="section">
  <div class="section-title">Education</div>
  ${education.map(edu => `
  <div class="edu-row">
    <div>
      <div class="edu-name">${edu.degree}</div>
      <div style="font-size:10.5px; color:#555;">${edu.institution}, ${edu.location}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:10.5px; font-weight:600;">CGPA: ${edu.cgpa}</div>
      <div style="font-size:10px; color:#888;">Graduated: ${edu.graduated}</div>
    </div>
  </div>`).join("")}
</div>

</body>
</html>`;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Please allow popups to download the resume PDF.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

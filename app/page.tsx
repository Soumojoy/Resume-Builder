'use client';

import { useRef , useState} from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from '../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';
import AccordionSection from '../components/AccordionSection';

// Constants for Dropdowns
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, i) => (currentYear + 5 - i).toString());

// Helper function: Dropdowns ke data ko Resume Preview ke liye proper string me convert karna
const renderDate = (startM: string, startY: string, endM: string, endY: string, isPresent: boolean) => {
  const start = [startM, startY].filter(Boolean).join(" ");
  const end = isPresent ? "Present" : [endM, endY].filter(Boolean).join(" ");
  if (!start && !end) return "";
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

export default function Home() {
  const { 
    personalInfo, summary, skills, workExperience, projects, education, certifications,
    updatePersonalInfo, updateSummary, 
    updateSkill, addSkill, removeSkill,
    updateExperience, addExperience, removeExperience,
    updateProject, addProject, removeProject,
    updateEducation, addEducation, removeEducation,
    updateCertification, addCertification, removeCertification
  } = useResumeStore();

  const resumeRef = useRef<HTMLDivElement>(null);
  const handleDownloadPdf = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${personalInfo.name.replace(/\s+/g, '_')}_Resume`,
  });

const [openSections, setOpenSections] = useState({
  personal: true,
  summary: true,
  skills: true,
  experience: true,
  projects: true,
  education: true,
  certifications: true,
});
  

  return (
    <main className="flex h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden text-black">
      
      {/* ================= LEFT SIDE: EDITOR PANEL ================= */}
      <div className="w-1/2 h-full bg-[#f8fafc] border-r border-gray-200 px-8 py-6 overflow-y-auto pb-32">
        <div className="flex justify-between items-center mb-8 sticky top-0 z-20 bg-[#f8fafc]/90 backdrop-blur-md py-4 border-b border-gray-200">
          <div>
  <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
  <p className="text-sm text-gray-500 mt-1">
    Build ATS-friendly resume in real time
  </p>
</div>
         <button
  onClick={() => handleDownloadPdf()}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all"
>
  Download PDF
</button>
        </div>
        
        <div className="flex flex-col gap-8">
          
          {/* --- Personal Info --- */}
          {/* <section className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold border-b border-gray-200 pb-3 text-gray-900">Personal Information</h2>
            <input placeholder="Full Name" className="border border-gray-300 px-4 py-3 
            rounded-xl text-sm bg-white focus:outline-none focus:ring-4 
            focus:ring-blue-100 focus:border-blue-500 transition-all focus:outline-blue-500" 
            value={personalInfo.name} 
            onChange={(e) => updatePersonalInfo('name', e.target.value)} />
            <div className="flex gap-2">
              <input placeholder="Email" className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
              <input placeholder="Phone" className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <input placeholder="Location (e.g. Bangalore, India)" className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/3 focus:outline-blue-500" value={personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
              <input placeholder="Portfolio / Website Link" className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/3 focus:outline-blue-500" value={personalInfo.portfolio} onChange={(e) => updatePersonalInfo('portfolio', e.target.value)} />
              <input placeholder="GitHub Link" className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/3 focus:outline-blue-500" value={personalInfo.github} onChange={(e) => updatePersonalInfo('github', e.target.value)} />
            </div>
          </section> */}
<AccordionSection
  title="Personal Information"
  sectionKey="personal"
  openSections={openSections}
setOpenSections={setOpenSections}
>
  <div className="grid grid-cols-1 gap-4">

    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">Full Name</label>
      <input
        placeholder="Enter your full name"
        className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
        value={personalInfo.name}
        onChange={(e) => updatePersonalInfo('name', e.target.value)}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <input
          placeholder="example@gmail.com"
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo('email', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Phone</label>
        <input
          placeholder="+91 XXXXX XXXXX"
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
        />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">Location</label>
      <input
        placeholder="Bangalore, India"
        className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
        value={personalInfo.location}
        onChange={(e) => updatePersonalInfo('location', e.target.value)}
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">Portfolio</label>
      <input
        placeholder="yourportfolio.com"
        className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
        value={personalInfo.portfolio}
        onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">GitHub</label>
        <input
          placeholder="github.com/username"
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          value={personalInfo.github}
          onChange={(e) => updatePersonalInfo('github', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">LinkedIn</label>
        <input
          placeholder="linkedin.com/in/username"
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          value={personalInfo.linkedin}
          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
        />
      </div>
    </div>
  </div>
</AccordionSection>

          {/* --- Summary --- */}
          <AccordionSection
  title="Professional Summary"
  sectionKey="summary"
 openSections={openSections}
  setOpenSections={setOpenSections}
>
  <textarea
    className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all h-32"
    value={summary}
    onChange={(e) => updateSummary(e.target.value)}
    placeholder="Write a strong professional summary..."
  />
</AccordionSection>

          {/* --- Skills --- */}
          <AccordionSection
  title="Skills"
  sectionKey="skills"
 openSections={openSections}
setOpenSections={setOpenSections}
>
  <div className="flex flex-col gap-3">
    {skills.map((skill, index) => (
      <div
        key={index}
        className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-100"
      >
        <input
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/3"
          value={skill.category}
          onChange={(e) =>
            updateSkill(index, 'category', e.target.value)
          }
          placeholder="Category (e.g. Languages)"
        />

        <input
          className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-2/3"
          value={skill.items}
          onChange={(e) =>
            updateSkill(index, 'items', e.target.value)
          }
          placeholder="Skills (comma separated)"
        />

        <button
          onClick={() => removeSkill(index)}
          className="text-red-500 hover:bg-red-100 p-3 rounded-xl transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ))}

    <button
      onClick={addSkill}
      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-3 rounded-xl w-fit transition"
    >
      <Plus size={16} />
      Add Skill
    </button>
  </div>
</AccordionSection>

          {/* --- Work Experience --- */}
         <AccordionSection
  title="Work Experience"
  sectionKey="experience"
   openSections={openSections}
  setOpenSections={setOpenSections}
>
            {/* <h2 className="text-lg font-bold border-b border-gray-200 pb-3 text-gray-900">Work Experience</h2> */}
            {workExperience.map((exp, index) => (
              <div
  key={index}
  className="border border-gray-200 p-5 rounded-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col gap-4 relative shadow-sm mb-4"
>
                <button onClick={() => removeExperience(index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
                
                <div className="flex gap-2 pr-8">
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={exp.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} placeholder="Role (e.g. Software Engineer)" />
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder="Company Name" />
                </div>
                
                <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-full focus:outline-blue-500" value={exp.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} placeholder="Location (e.g. Bangalore, India)" />

                {/* Date Picker Row */}
                <div className="flex gap-2 items-center flex-wrap bg-white p-2 border border-gray-200 rounded">
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={exp.startMonth} onChange={(e) => updateExperience(index, 'startMonth', e.target.value)}>
                    <option value="">Month</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={exp.startYear} onChange={(e) => updateExperience(index, 'startYear', e.target.value)}>
                    <option value="">Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  
                  <span className="text-gray-500 text-sm mx-1">to</span>

                  {!exp.isPresent && (
                    <>
                      <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={exp.endMonth} onChange={(e) => updateExperience(index, 'endMonth', e.target.value)}>
                        <option value="">Month</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={exp.endYear} onChange={(e) => updateExperience(index, 'endYear', e.target.value)}>
                        <option value="">Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </>
                  )}

                  {/* Present Checkbox */}
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 ml-2 cursor-pointer select-none">
                    <input type="checkbox" className="accent-blue-600 w-4 h-4 cursor-pointer" checked={exp.isPresent} onChange={(e) => updateExperience(index, 'isPresent', e.target.checked)} />
                    Present
                  </label>
                </div>

                <textarea className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all h-32 focus:outline-blue-500" value={exp.points.join('\n')} onChange={(e) => updateExperience(index, 'points', e.target.value.split('\n'))} placeholder="Enter responsibilities (one point per line)" />
              </div>
            ))}
            <button onClick={addExperience} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-max p-2 -ml-2 rounded hover:bg-blue-50 transition-colors">
              <Plus size={16} /> Add Experience
            </button>
       </AccordionSection>

          {/* --- Projects --- */}
          <AccordionSection
  title="Projects"
  sectionKey="projects"
  openSections={openSections}

setOpenSections={setOpenSections}
>
            
            {projects.map((proj, index) => (
              <div
  key={index}
  className="border border-gray-200 p-5 rounded-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col gap-4 relative shadow-sm mb-4"
>
                <button onClick={() => removeProject(index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
                <div className="flex gap-2 pr-8">
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={proj.name} onChange={(e) => updateProject(index, 'name', e.target.value)} placeholder="Project Name" />
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={proj.role} onChange={(e) => updateProject(index, 'role', e.target.value)} placeholder="Your Role (e.g. Frontend)" />
                </div>
                <div className="flex gap-2">
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={proj.link} onChange={(e) => updateProject(index, 'link', e.target.value)} placeholder="Live Link (optional)" />
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={proj.stack} onChange={(e) => updateProject(index, 'stack', e.target.value)} placeholder="Tech Stack Used" />
                </div>
                <textarea className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all h-24 focus:outline-blue-500" value={proj.points.join('\n')} onChange={(e) => updateProject(index, 'points', e.target.value.split('\n'))} placeholder="Project details (one point per line)" />
              </div>
            ))}
            <button onClick={addProject} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-max p-2 -ml-2 rounded hover:bg-blue-50 transition-colors">
              <Plus size={16} /> Add Project
            </button>
          </AccordionSection>

          {/* --- Education --- */}
         <AccordionSection
  title="Education"
  sectionKey="education"
  openSections={openSections}
setOpenSections={setOpenSections}
>
          
            {education.map((edu, index) => (
              <div
  key={index}
  className="border border-gray-200 p-5 rounded-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col gap-4 relative shadow-sm mb-4"
>
                <button onClick={() => removeEducation(index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
                
                <div className="flex gap-2 pr-8">
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} placeholder="Degree (e.g. B.Tech)" />
                  <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-1/2 focus:outline-blue-500" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} placeholder="Institution Name" />
                </div>

                {/* Date Picker Row for Education */}
                <div className="flex gap-2 items-center flex-wrap bg-white p-2 border border-gray-200 rounded">
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={edu.startMonth} onChange={(e) => updateEducation(index, 'startMonth', e.target.value)}>
                    <option value="">Month</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={edu.startYear} onChange={(e) => updateEducation(index, 'startYear', e.target.value)}>
                    <option value="">Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  
                  <span className="text-gray-500 text-sm mx-1">to</span>

                  {!edu.isPresent && (
                    <>
                      <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={edu.endMonth} onChange={(e) => updateEducation(index, 'endMonth', e.target.value)}>
                        <option value="">Month</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={edu.endYear} onChange={(e) => updateEducation(index, 'endYear', e.target.value)}>
                        <option value="">Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </>
                  )}

                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 ml-2 cursor-pointer select-none">
                    <input type="checkbox" className="accent-blue-600 w-4 h-4 cursor-pointer" checked={edu.isPresent} onChange={(e) => updateEducation(index, 'isPresent', e.target.checked)} />
                    Present
                  </label>
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-max p-2 -ml-2 rounded hover:bg-blue-50 transition-colors">
              <Plus size={16} /> Add Education
            </button>
        </AccordionSection>

          {/* --- Certifications --- */}
          <AccordionSection
  title="Certifications"
  sectionKey="certifications"
 openSections={openSections}
setOpenSections={setOpenSections}
>
            
            {certifications.map((cert, index) => (
              <div
  key={index}
  className="border border-gray-200 p-5 rounded-2xl bg-gradient-to-b from-white to-gray-50 flex flex-col gap-4 relative shadow-sm mb-4"
>
                <button onClick={() => removeCertification(index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={18} /></button>
                <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-[90%] focus:outline-blue-500" value={cert.name} onChange={(e) => updateCertification(index, 'name', e.target.value)} placeholder="Certificate Name" />
                <input className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-[90%] focus:outline-blue-500" value={cert.issuer} onChange={(e) => updateCertification(index, 'issuer', e.target.value)} placeholder="Issuer (e.g. Google, Udemy)" />
                
                <div className="flex gap-2 items-center flex-wrap">
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={cert.month} onChange={(e) => updateCertification(index, 'month', e.target.value)}>
                    <option value="">Month</option>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="border p-1.5 rounded text-sm focus:outline-blue-500 bg-white" value={cert.year} onChange={(e) => updateCertification(index, 'year', e.target.value)}>
                    <option value="">Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <input
  className="border border-gray-300 px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
  placeholder="Certificate Link"
  value={cert.link || ""}
  onChange={(e) =>
    updateCertification(index, "link", e.target.value)
  }
/>
              </div>
            ))}
            <button onClick={addCertification} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium w-max p-2 -ml-2 rounded hover:bg-blue-50 transition-colors">
              <Plus size={16} /> Add Certification
            </button>
          </AccordionSection>

        </div>
      </div>

      {/* ================= RIGHT SIDE: RESUME PREVIEW ================= */}
      <div className="w-1/2 h-full bg-slate-300 flex justify-center p-10 overflow-y-auto">
        <div ref={resumeRef} className="bg-white w-[210mm] min-h-[297mm]  p-[20mm] font-sans text-black">
          
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-[24px] font-bold uppercase text-black mb-1">{personalInfo.name}</h1>
            <p className="text-[11px] text-gray-800 leading-tight">
              {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
            </p>
            <p className="text-[11px] text-gray-800 leading-tight mt-[2px]">
              {personalInfo.portfolio} | {personalInfo.github} | {personalInfo.linkedin}
            </p>
          </div>

          {/* Summary */}
          {summary && (
            <div className="mb-4">
              <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Summary</h2>
              <p className="text-[11px] text-gray-900 leading-[1.6] text-justify">{summary}</p>
            </div>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Skills</h2>
              <div className="text-[11.5px] text-gray-900 leading-[1.6]">
                {skills.map((skill, index) => skill.category && (
                  <div key={index} className="mb-[2px]">
                    <span className="font-bold">{skill.category}: </span>
                    <span>{skill.items}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {workExperience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Work Experience</h2>
              {workExperience.map((exp, index) => exp.role && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-bold text-[12px] text-black">
                    <span>{exp.role}</span>
                    {/* Render helper function called here */}
                    <span>{renderDate(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isPresent)}</span>
                  </div>
                  <div className="flex justify-between text-[11.5px] text-gray-800 font-medium mb-[4px]">
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-gray-900 leading-[1.6]">
                    {exp.points.map((point, i) => point.trim() !== "" && (
                      <li key={i} className="mb-[2px]">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Projects</h2>
              {projects.map((proj, index) => proj.name && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-bold text-[12px] text-black">
                    <span>{proj.name} <span className="font-normal italic text-[11px]">| {proj.role}</span></span>
                    {proj.link && <span className="text-[11px] font-normal text-blue-600">{proj.link}</span>}
                  </div>
                  <div className="text-[11px] text-gray-800 font-medium mb-[4px]">
                    Stack: {proj.stack}
                  </div>
                  <ul className="list-disc pl-5 text-[11px] text-gray-900 leading-[1.6]">
                    {proj.points.map((point, i) => point.trim() !== "" && (
                      <li key={i} className="mb-[2px]">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education & Certifications */}
          <div className="flex justify-between gap-4">
            {education.length > 0 && (
              <div className="w-1/2">
                <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Education</h2>
                {education.map((edu, index) => edu.degree && (
                  <div key={index} className="mb-2 text-[11px]">
                    <div className="font-bold text-[11.5px]">{edu.degree}</div>
                    <div className="text-gray-800">
                      {edu.institution} | {renderDate(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear, edu.isPresent)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {certifications.length > 0 && (
              <div className="w-1/2">
                <h2 className="text-[13px] font-bold uppercase text-black border-b-[1.5px] border-black mb-2 pb-[2px]">Certifications</h2>
                {certifications.map((cert, index) => cert.name && (
                  <div key={index} className="mb-2 text-[11px]">
                    <div className="font-bold text-[11.5px]">{cert.name}</div>
                   <div className="flex justify-between items-start gap-3">
  <div className="text-gray-800">
    {cert.issuer} | {[cert.month, cert.year].filter(Boolean).join(" ")}
  </div>

  {cert.link && (
    <span className="text-blue-600 text-[10px] whitespace-nowrap cursor-pointer">
      {cert.link}
    </span>
  )}
</div>
 
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      
    </main>
  );
}
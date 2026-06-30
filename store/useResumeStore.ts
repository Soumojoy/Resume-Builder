import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Experience { 
  role: string;
  company: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent: boolean;
  points: string[];
}

interface Skill {
  category: string;
  items: string;
}

interface Project {
  name: string;
  role: string;
  link: string;
  stack: string;
  points: string[];
}

interface Education { 
  degree: string;
  institution: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent: boolean;
}

interface Certification {
  name: string;
  issuer: string;
  month: string;
  year: string;
   link: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };

  summary: string;
  skills: Skill[];
  workExperience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];

  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (value: string) => void;

  updateSkill: (index: number, field: string, value: string) => void;
  updateExperience: (
    index: number,
    field: string,
    value: string | string[] | boolean
  ) => void;
  updateProject: (
    index: number,
    field: string,
    value: string | string[]
  ) => void;
  updateEducation: (
    index: number,
    field: string,
    value: string | boolean
  ) => void;
  updateCertification: (index: number, field: string, value: string) => void;

  addSkill: () => void;
  addExperience: () => void;
  addProject: () => void;
  addEducation: () => void;
  addCertification: () => void;

  removeSkill: (index: number) => void;
  removeExperience: (index: number) => void;
  removeProject: (index: number) => void;
  removeEducation: (index: number) => void;
  removeCertification: (index: number) => void;
}

export const useResumeStore = create<ResumeData>()(
  persist(
    (set) => ({
      personalInfo: {
        name: "Soumojoy Bhattacharjee",
        email: "soumozoy37@gmail.com",
        phone: "+91 6294514804",
        location: "Bangalore, India",
        github: "github.com/Soumojoy",
        linkedin: "linkedin.com/in/soumo-zoy-3910b8187",
        portfolio: "portfolio-lsoumozoy.vercel.app",
      },

      summary:
        "Software Engineer with 4+ years of experience building scalable, high-performance web applications using React.js, Node.js and C#. Strong in translating UI/UX designs into reusable components, optimizing performance, collaborating across teams, and delivering reliable, maintainable code.",

      skills: [
        {
          category: "Languages",
          items: "JavaScript (ES6+), TypeScript, C#, SQL",
        },
        {
          category: "Frameworks & Libraries",
          items:
            "React.js, Next.js, Node.js, Express.js, Mongoose, ASP.NET Core",
        },
        {
          category: "Databases",
          items: "MongoDB, MySQL",
        },
        {
          category: "Tools & Cloud",
          items: "Git, GitHub, GitLab, CI/CD, Docker, AWS, Azure",
        },
      ],

      workExperience: [
        {
          role: "Developer",
          company: "Wipro",
          location: "Bangalore, India",
          startMonth: "Nov",
          startYear: "2021",
          endMonth: "",
          endYear: "",
          isPresent: true,
          points: [
            "Improved user experience and application scalability by developing responsive web interfaces using React.js, TypeScript, HTML5, resulting in 30-40% faster load times.",
            "Accelerated feature development by 35% and reduced code duplication by 40% by building reusable UI architectures.",
            "Ensured reliable data flow and reduced runtime errors by 25% by integrating RESTful and GraphQL APIs using Redux.",
          ],
        },
      ],

      projects: [
        {
          name: "Automated Video Generator",
          role: "FullStack",
          link: "",
          stack: "React, Node, AWS Polly, S3, FFmpeg, Google APIs",
          points: [
            "Built the video generation UI using reusable React components.",
            "Integrated real-time APIs and optimized rendering.",
          ],
        },
        {
          name: "Ai Website generator",
          role: "Frontend",
          link: "Live Demo",
          stack: "LLM, RAG, React, AI",
          points: [
            "Built an AI-powered website generator using React.js.",
            "Designed and developed end-to-end UI/UX with dynamic forms.",
          ],
        },
      ],

      education: [
        {
          degree: "Mtech in Software Systems",
          institution: "Bits Pilani",
          startMonth: "Jul",
          startYear: "2024",
          endMonth: "Jun",
          endYear: "2026",
          isPresent: true,
        },
        {
          degree: "BCA",
          institution: "BP Poddar Institute of Management & Tech",
          startMonth: "Aug",
          startYear: "2018",
          endMonth: "May",
          endYear: "2021",
          isPresent: false,
        },
      ],

      certifications: [
        {
          name: "Programming Certificates (C#, Js, Sharepoint, Azure)",
          issuer: "Wipro & LinkedIn",
          month: "",
          year: "2021",
           link: ""
        },
      ],

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          personalInfo: {
            ...state.personalInfo,
            [field]: value,
          },
        })),

      updateSummary: (value) => set(() => ({ summary: value })),

      updateSkill: (index, field, value) =>
        set((state) => {
          const newArr = [...state.skills];
          newArr[index] = { ...newArr[index], [field]: value };
          return { skills: newArr };
        }),

      updateExperience: (index, field, value) =>
        set((state) => {
          const newArr = [...state.workExperience];
          newArr[index] = {
            ...newArr[index],
            [field]: value,
          } as Experience;
          return { workExperience: newArr };
        }),

      updateProject: (index, field, value) =>
        set((state) => {
          const newArr = [...state.projects];
          newArr[index] = { ...newArr[index], [field]: value };
          return { projects: newArr };
        }),

      updateEducation: (index, field, value) =>
        set((state) => {
          const newArr = [...state.education];
          newArr[index] = {
            ...newArr[index],
            [field]: value,
          } as Education;
          return { education: newArr };
        }),

      updateCertification: (index, field, value) =>
        set((state) => {
          const newArr = [...state.certifications];
          newArr[index] = { ...newArr[index], [field]: value };
          return { certifications: newArr };
        }),

      addSkill: () =>
        set((state) => ({
          skills: [...state.skills, { category: "", items: "" }],
        })),

      addExperience: () =>
        set((state) => ({
          workExperience: [
            ...state.workExperience,
            {
              role: "",
              company: "",
              location: "",
              startMonth: "",
              startYear: "",
              endMonth: "",
              endYear: "",
              isPresent: false,
              points: [],
            },
          ],
        })),

      addProject: () =>
        set((state) => ({
          projects: [
            ...state.projects,
            { name: "", role: "", link: "", stack: "", points: [] },
          ],
        })),

      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              degree: "",
              institution: "",
              startMonth: "",
              startYear: "",
              endMonth: "",
              endYear: "",
              isPresent: false,
            },
          ],
        })),

      addCertification: () =>
        set((state) => ({
          certifications: [
            ...state.certifications,
            {
  name: "",
  issuer: "",
  month: "",
  year: "",
  link: "",
}
          ],
        })),

      removeSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),

      removeExperience: (index) =>
        set((state) => ({
          workExperience: state.workExperience.filter((_, i) => i !== index),
        })),

      removeProject: (index) =>
        set((state) => ({
          projects: state.projects.filter((_, i) => i !== index),
        })),

      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

      removeCertification: (index) =>
        set((state) => ({
          certifications: state.certifications.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "resume-storage",
    }
  )
);
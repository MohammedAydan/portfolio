import { DeveloperData } from "./DeveloperData";

export const myDeveloperData: DeveloperData = {
    id: "mohamed-aydan",
    userId: "mohamed-aydan",
    name: "Mohamed Aydan",
    title: "Full Stack And Flutter Developer",
    description: "Building innovative web solutions with modern technologies",
    actions: {
        viewProjects: "View projects",
        downloadCV: "Download CV",
    },

    projects: [
        {
            type: "Web App",
            name: "CoursesDetailsPage-NEXTJS",
            technologies: "NextJS, TailwindCSS",
            viewProject: "https://courses-details-page-nextjs.vercel.app/",
            sourceCode: "https://github.com/MohammedAydan/CoursesDetailsPage-NEXTJS",
        },
        {
            type: "Mobile App",
            name: "SOCIAL APP",
            technologies: "Flutter, Dart, Supabase",
            viewProject: null,
            sourceCode: "https://github.com/MohammedAydan/SOCIAL",
        },
        {
            type: "Web App",
            name: "E-Commerce Platform",
            technologies: "React, Node.js, MongoDB",
            description: "Full-stack online store with user authentication, product filtering, and payment integration.",
            viewProject: null,
            sourceCode: null,
        },
        {
            type: "Desktop App",
            name: "Gym Management System",
            technologies: "C#, .NET, WPF, Firebase",
            description: "A modern gym management system with membership tracking, subscription management, and reporting features.",
            viewProject: null,
            sourceCode: null,
        },
        {
            type: "Mobile App",
            name: "Quran App",
            technologies: "Flutter, Dart, Firebase",
            viewProject: "https://github.com/MohammedAydan/QuranApp-flutter",
            sourceCode: "https://github.com/MohammedAydan/QuranApp-flutter",
        }
    ],

    skills: [
        {
            title: "frontend",
            body: "HTML5, CSS3, JavaScript, TypeScript, React, Next.js, TailwindCSS, Material-UI"
        },
        {
            title: "backend",
            body: "C#, .NET Core, PHP, Laravel, RESTful APIs, Node.js, Express.js"
        },
        {
            title: "databases",
            body: "MySQL, PostgreSQL, Firebase Firestore, MongoDB, Supabase"
        },
        {
            title: "mobile",
            body: "Flutter, Dart, React Native, Firebase, Supabase"
        },
        {
            title: "DevOps & Cloud",
            body: "Docker, Kubernetes, AWS, Firebase Hosting, Vercel, Netlify"
        },
        {
            title: "tools",
            body: "VS Code, Visual Studio 2022, Android Studio, Git, GitHub, Postman, Figma"
        },
        {
            title: "package managers",
            body: "NPM, Yarn, PNPM, Composer, Pip"
        }
    ],


    toolsAndFrameworks: [
        {
            title: "frontend",
            body: "HTML5, CSS3, JavaScript, TypeScript, React, Next.js, TailwindCSS, Material-UI"
        },
        {
            title: "backend",
            body: "C#, .NET Core, PHP, Laravel, RESTful APIs, Node.js, Express.js"
        },
        {
            title: "databases",
            body: "MySQL, PostgreSQL, Firebase Firestore, MongoDB, Supabase"
        },
        {
            title: "mobile",
            body: "Flutter, Dart, React Native, Firebase, Supabase"
        },
        {
            title: "DevOps & Cloud",
            body: "Docker, Kubernetes, AWS, Firebase Hosting, Vercel, Netlify"
        },
        {
            title: "tools",
            body: "VS Code, Visual Studio 2022, Android Studio, Git, GitHub, Postman, Figma"
        },
        {
            title: "package managers",
            body: "NPM, Yarn, PNPM, Composer, Pip"
        }
    ],

    workExperience: [
        {
            title: "Junior Frontend Developer",
            company: "My Projects",
        },
        {
            title: "Freelance Full Stack Developer",
            company: "Self-Employed",
        },
    ],

    educationAndCertifications: [
        {
            type: "education",
            title: "Bachelor of Computer Science",
            subTitle: "University of Mansoura | 2022 - 2027",
        },
        {
            type: "certification",
            title: "Ezzsteel Internship Program 2024",
            subTitle: "Held from August 4 to August 15",
        }
    ],
};

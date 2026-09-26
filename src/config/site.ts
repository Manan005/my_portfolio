export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  /** Portrait phone screenshots, shown as tilted devices instead of `image` */
  mobileImages?: string[];
  /** Full-resolution images opened when the preview is clicked (defaults to mobileImages / image) */
  screenshots?: string[];
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
  stats?: JobStat[];
};

export type JobStat = { value: string; label: string };

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Manan Surati",
  firstName: "Manan",
  url: "https://manan-builds.vercel.app",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile.jpg",
    "/profile2.jpg",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "MS",
  role: "Full Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  timezone: "Asia/Kolkata",
  email: "manansurti123@gmail.com",
  greeting: "Hey, I'm Manan",
  tagline: "I build products from the ground up, looking beyond the code to solve real problems where design, functionality, and even the smallest details matter.",
  about: [
    "Hey, I'm Manan, a software engineering student and full stack developer with a builder's mentality. I love developing products from the ground up, clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.",
    "I spend most of my time in the terminal, the browser, or scribbling on a whiteboard. I like to look beyond the code to the real problem it's solving, and I enjoy making polished things actually hold up.",
    "I don't ship junk. I take ownership of what I build, learn whatever it takes to get it right, and I build best when I'm curious.",
  ],
  tldr: [
    "Building products from the ground up.",
    "Learning technologies.",
    "Shipping consistently.",
    "Obsessed with clean code.",
  ],
  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: "LangChain • LangGraph • RAG • System Design",
    nowBuilding: "HR & Payroll Platform",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/Manan005",
    twitter: "https://x.com/mananB_S",
    linkedin: "https://www.linkedin.com/in/manan-surati",
    email: "mailto:manansurti123@gmail.com",
    resume: "https://drive.google.com/file/d/13fJfjPNuseieo9gKXBB6KoBDONIUJumY/view?usp=drive_link",
    discord: "",
    medium: "",
  },
  experience: [
    {
      company: "SWYN Digital",
      role: "Full Stack Developer Intern",
      period: "Aug 2026 – Present",
      blurb:
        "Built a multi-tenant rental management platform (NestJS, MySQL, Next.js) with tenant isolation, role-based permissions and token auth, and an animated 3D company landing page with Next.js, Three.js and GSAP. Integrated the WhatsApp Cloud API for booking and payment notifications, and redesigned the staff interface with a new design system, dark mode and visual regression testing.",
      url: "",
      stats: [
        { value: "~190", label: "Automated Tests" },
        { value: "22", label: "Screens Redesigned" },
        { value: "19", label: "UI Components" },
        { value: "8", label: "WhatsApp Templates" },
      ],
    },
    {
      company: "Google Gemini",
      role: "Student Ambassador",
      period: "Apr 2026 – Jun 2026",
      blurb:
        "Organized focused, peer-to-peer learning sessions demonstrating Google Gemini's practical applications for software engineering and study workflows. Advocated for AI literacy within targeted student groups and gathered direct user feedback.",
      url: "",
    },
  ] as Job[],
  projects: [
    {
      title: "HR & Payroll Platform",
      blurb:
        "An integrated HR and payroll platform where employees, contracts, attendance and leave feed a payrun that issues validated payslips as PDF and email, with five-role access enforced server-side.",
      story:
        "Built across 18 data models and 40 routes on Next.js App Router with Server Actions. The configurable payroll engine uses a custom Decimal expression interpreter (tokenizer and recursive-descent parser), so user-editable salary formulas run without eval, and every business rule is proven by 12 re-runnable verification scripts. The React Server Components dashboard was optimized from ~40 SQL statements to 27 using relation filters and request-level caching, then streamed with Suspense to render in ~0.5s instead of ~2s.",
      stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Tailwind CSS v4", "Recharts"],
      year: "2026",
      links: {
        live: "https://peoplepay360-black.vercel.app/login",
        source: "https://github.com/Manan005/Odoo_Hack_OFF",
      },
      featured: true,
      image: "/project-images/hr-payroll.jpg",
      screenshots: ["/project-images/hr-payroll-full.jpg"],
      categories: ["Fullstack", "Backend"],
    },
    {
      title: "Smart Wardrobe Manager",
      blurb:
        "A cross-platform mobile app for efficient wardrobe tracking and \"Cost Per Wear\" visualization, with weather-aware daily outfit suggestions.",
      story:
        "Engineered a responsive \"Bento Grid\" dashboard using React Native Reanimated for smooth, 60fps interactions. A context-aware \"Smart Shuffle\" feature uses live weather data to automate daily outfit suggestions, backed by Supabase and Supabase Auth.",
      stack: ["React Native", "Expo", "TypeScript", "Supabase", "Reanimated", "Weather API"],
      year: "2026",
      links: {
        source: "https://github.com/Manan005/closet_app_native",
      },
      featured: true,
      mobileImages: ["/project-images/smart-wardrobe-1.jpg", "/project-images/smart-wardrobe-2.jpg"],
      categories: ["Frontend", "Fullstack"],
    },
    {
      title: "Digital Wellbeing for Web Browser",
      blurb:
        "A custom browser extension built with React and TypeScript for seamless screen time tracking and digital habit management.",
      story:
        "Engineered a responsive Tailwind CSS dashboard and robust background workers to capture and visualize real-time website engagement, built on the Web Extension API and bundled with Vite.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Web Extension API"],
      year: "2026",
      links: {
        source: "https://github.com/Manan005/Digital-Wellbeing-Desktop---Web-Extension",
      },
      featured: true,
      image: "/project-images/digital-wellbeing.jpg",
      screenshots: ["/project-images/digital-wellbeing-full.jpg"],
      categories: ["Frontend"],
    },
    {
      title: "Video Intelligence Pipeline",
      blurb:
        "A modular Python video-intelligence pipeline for transcription and interview-style video insights.",
      story:
        "Built around OpenAI Whisper for speech-to-text and served through FastAPI, with a modular pipeline design that turns raw interview videos into transcripts and structured insights.",
      stack: ["Python", "FastAPI", "OpenAI Whisper"],
      year: "2026",
      links: {
        source: "https://github.com/Manan005",
      },
      featured: true,
      status: "Hackathon Winner",
      categories: ["Backend"],
    },
  ] as Project[],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
    "Figma",
    "C++",
    "Python",
    "C",
    "Java",
    "SQL",
    "HTML5",
    "CSS3",
    "React Native",
    "Expo",
    "NestJS",
    "FastAPI",
    "MySQL",
    "Appwrite",
    "LangChain",
    "LangGraph",
    "RAG",
    "NumPy",
    "Pandas",
    "Docker",
    "Google Cloud",
    "AWS",
    "n8n",
    "Linux",
  ],
  writing: [] as Post[],
  github: {
    username: "Manan005",
    contributionsLastYear: "",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;

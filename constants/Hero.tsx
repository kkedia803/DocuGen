import { Book, BookOpen, File, FileJson, FileSearch, FileText, GraduationCap } from "lucide-react";

// Define the type for the objects in the HeroImage array
interface HeroImageOption {
    img: string;
    alt: string;
}

// Define and export the HeroImage array with the correct type
const HeroImage: HeroImageOption[] = [
    {
        img: '/Hero1.png',
        alt: "Search Document",
    },
    {
        img: '/Hero2.png',
        alt: "Repositories",
    },
    {
        img: '/Hero3.png',
        alt: "Document Preview",
    },
    {
        img: '/Hero4.png',
        alt: "Document Download",
    },
];

export default HeroImage;

interface HeroTextOptions {
    tagLine: string;
}

export const HeroText: HeroTextOptions[] = [
    {
        tagLine: "Easier than ever to",
    },
    {
        tagLine: "generate your project",
    },
    {
        tagLine: "document",
    },
];

interface HowItWorksProps {
    heading: string;
    description: string;
    img: string;
}

export const HowItWorks: HowItWorksProps[] = [
    {
        heading: " 1. Connect your github",
        description: "Link your GitHub account and select a repository.",
        img: "/Hero2.png",
    },
    {
        heading: "2. Choose document type",
        description: "Select the type of document you want to generate.",
        img: "/Hero1.png",

    },
    {
        heading: "3. Generate & Download",
        description: "Our AI creates your document, which you can edit and download.",
        img: "/Hero3.png",

    },

];

interface FeaturedProps {
    heading: string;
    description: string;
    img: string;
    logo: any;
}

export const Features: FeaturedProps[] = [
    {
        heading: "README Generation",
        description: "Professional README files with project overview, installation guides, and usage instructions.",
        img: "/Hero4.png",
        logo: FileText,
    },
    {
        heading: "API Documentation",
        description: "Detailed API documentation with endpoints, parameters, and response examples.",
        img: "/Hero4.png",
        logo: FileJson,


    },
    {
        heading: "Technical Reports",
        description: "Comprehensive technical documentation covering architecture, design patterns, and implementation details.",
        img: "/Hero4.png",
        logo: BookOpen,

    },
    {
        heading: "Research Papers",
        description: "Academic-style research papers highlighting your project's innovative aspects and methodologies.",
        img: "/Hero4.png",
        logo: FileSearch,

    },
    {
        heading: "Thesis Documentation",
        description: "Formal thesis documentation with research methodology, findings, and conclusions.",
        img: "/Hero4.png",
        logo: GraduationCap,

    },
    {
        heading: "User Guides",
        description: "Detailed user manuals and guides for end-users and developers.",
        img: "/Hero4.png",
        logo: Book,

    },

];


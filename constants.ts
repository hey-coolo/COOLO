
import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, DesignPowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// PRO TIP: Replace these strings with your direct image links (ending in .jpg, .png, or .webp)
// If using GitHub: https://raw.githubusercontent.com/username/repo/main/assets/images/file.jpg

export const ASSETS = {
  hero: {
    viz: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', 
    ooh: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
  },
  services: {
    clarity: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=1200',
    designPower: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80&w=1200',
    partnership: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=1200'
  },
  team: {
    franco: './assets/images/franco.webp',
    ariana: './assets/images/ariana.webp'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: '-unmplynmt-',
    slug: 'unmplynmt',
    description: 'Brutalist identity system exploring the friction of labor and identity.',
    category: 'Brand Identity',
    tags: ['Brutalism', 'Typography', 'Strategy'],
    year: 2025,
    imageUrl: 'https://github.com/hey-coolo/COOLO/blob/main/assets/images/Thumbnail_unp.webp', // REPLACE_WITH_UNMPLYNMT_IMG
    featured: true,
    client: 'Internal Project',
    role: 'Art Direction & Design',
    story: {
        goal: "Translate the social friction of unemployment into a premium, architectural visual language.",
        gap: "Most protest-led branding feels 'cheap'. We needed to prove that raw social commentary could hold high-end design value.",
        gamble: "Total elimination of secondary colors. We relied entirely on black, white, and extreme typographic scale.",
        gain: "Establishment of the COOLO 'No Magic' baseline—Logic over decoration.",
        processImages: ['https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 2,
    title: 'Just Boxes',
    slug: 'just-boxes',
    description: 'Elevating the structural honesty of material packaging.',
    category: 'Packaging',
    tags: ['Packaging', 'Industrial', 'Minimalism'],
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1530519729491-acf5b58454ba?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_JUSTBOXES_IMG
    featured: true,
    client: 'Just Boxes',
    role: 'Creative Direction',
    story: {
        goal: "Celebrate cardboard as a primary luxury material.",
        gap: "Sustainable packaging is often over-designed. We stripped it back to the absolute structural minimum.",
        gamble: "No plastic coatings. We used structural folding and high-contrast ink to create the 'Premium' feel.",
        gain: "A signature packaging system that is 100% recyclable and 100% unmistakable.",
        processImages: ['https://images.unsplash.com/photo-1606206591513-adbf01ac2191?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 3,
    title: 'Surfboard v001',
    slug: 'surfboard-v001',
    description: 'Technical 3D exploration of hydro-dynamic resin surfacing.',
    category: '3D Design',
    tags: ['3D Viz', 'Technical', 'Surfacing'],
    year: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_SURFBOARD_IMG
    featured: true,
    client: 'Technical Study',
    role: '3D Artist',
    story: {
        goal: "Mimic the exact light refraction of hand-shaped surfboard resin in a digital environment.",
        gap: "Generic 3D surfboard renders lack the 'depth' of real glassing. We focused on the subsurface scattering of the material.",
        gamble: "A 2-week deep dive into a single material shader.",
        gain: "The creation of our 'Hydro-Logic' shader library, used in all current hardware client builds.",
        processImages: ['https://images.unsplash.com/photo-1531315630201-bb152f135884?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 4,
    title: 'The Cartridges',
    slug: 'the-cartridges',
    description: 'Hardware visualization focusing on modular industrial aesthetics.',
    category: '3D Design',
    tags: ['Industrial', 'Hardware', 'Lighting'],
    year: 2021,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_CARTRIDGES_IMG
    featured: false,
    client: 'Modular Labs',
    role: 'Visualization Lead',
    story: {
        goal: "Represent complex modularity through simple, high-res geometric lighting.",
        gap: "Technical products are often shown in flat lighting. We treated these like luxury timepieces.",
        gamble: "Using pitch-black environments to force focus on material quality.",
        gain: "A set of high-converting visual assets for a seed-round pitch deck.",
        processImages: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 5,
    title: 'Jonhey’s Dumpling House',
    slug: 'jonheys-dumpling-house',
    description: 'High-energy hospitality branding with a contemporary street-food edge.',
    category: 'Brand Identity',
    tags: ['Hospitality', 'Kinetic Type', 'Logo'],
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_JONHEYS_IMG
    featured: true,
    client: 'Jonhey’s',
    role: 'Lead Designer',
    story: {
        goal: "Break the 'red and gold' hospitality cliché for a younger, urban crowd.",
        gap: "Dumpling houses usually feel traditional. This one needed to feel like a high-speed streetwear drop.",
        gamble: "Using neon purple and heavy, distorted typography for a traditional product.",
        gain: "Immediate cult-status and a visual system that works perfectly on apparel.",
        processImages: ['https://images.unsplash.com/photo-1547928576-a4a33237cea3?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 6,
    title: 'Franca Austral',
    slug: 'franca-austral',
    description: 'Editorial-led identity design inspired by Southern landscapes.',
    category: 'Brand Identity',
    tags: ['Editorial', 'Strategy', 'Nature'],
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_FRANCA_IMG
    featured: false,
    client: 'Franca Collective',
    role: 'Art Director',
    story: {
        goal: "Capture the vast silence of southern landscapes through typographic negative space.",
        gap: "Nature brands are often cluttered. We wanted it to feel as open as the land itself.",
        gamble: "A 60-page brand book with almost zero body copy—relying purely on scale and hierarchy.",
        gain: "A sophisticated, high-end presence that attracted luxury tourism partners.",
        processImages: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 7,
    title: 'Traveller to Entrepreneur',
    slug: 'traveller-entrepreneur',
    description: 'Strategic repositioning for a high-performance global nomadic brand.',
    category: 'Strategy',
    tags: ['Positioning', 'Messaging', 'Narrative'],
    year: 2021,
    imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=95&w=1200', // REPLACE_WITH_TRAVELLER_IMG
    featured: true,
    client: 'Personal Brand',
    role: 'Lead Strategist',
    story: {
        goal: "Pivot an audience from 'lifestyle travel' to 'business technicality'.",
        gap: "The travel content was too casual. The brand needed to pivot to high-ticket consulting.",
        gamble: "Cutting 80% of existing content categories to focus on 'The Grind' as a technical discipline.",
        gain: "A 300% increase in inbound consulting leads within 90 days of repositioning.",
        processImages: ['https://images.unsplash.com/photo-1454165833767-027ff33027b6?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800']
    }
  }
];

export const NAV_LINKS = [
  { name: 'Studio', path: '/about' }, 
  { name: 'Clarity', path: '/clarity' },
  { name: 'Design Power', path: '/design-power' },
  { name: 'Partnership', path: '/partnership' },
  { name: 'Work', path: '/work' },
  { name: 'Journal', path: '/journal' },
  { name: 'FAQ', path: '/faq' },
];

export const SERVICE_LEGS: ServiceLeg[] = [
  {
    id: 'clarity',
    title: 'I Need Clarity',
    subtitle: 'The No Magic Formula™',
    hoverText: 'Strategic deconstruction for high-growth brands.',
    visual: 'Minimalist Strategy',
    path: '/clarity',
    imageUrl: ASSETS.services.clarity
  },
  {
    id: 'design-power',
    title: 'I Need Design Power',
    subtitle: 'The Creative Method™',
    hoverText: 'Identity, 3D, and Webflow builds.',
    visual: 'High-End Execution',
    path: '/design-power',
    imageUrl: ASSETS.services.designPower
  },
  {
    id: 'partner',
    title: 'I Need a Partner',
    subtitle: 'Technical Partnership',
    hoverText: 'Elite white-label unit for senior agencies.',
    visual: 'Scale Ops',
    path: '/partnership',
    imageUrl: ASSETS.services.partnership
  }
];

export const CLARITY_TIERS: ClarityTier[] = [
    { 
        slug: 'clarity-audit',
        name: 'Clarity Audit', 
        subtitle: 'The Diagnostic Phase',
        desc: "A surgical audit of your current brand positioning. We find the leaks in your narrative.", 
        cta: "Book Audit", 
        features: ["Narrative Audit", "Competitor Matrix", "Friction Report", "Immediate Fixes"],
        timeline: "1 Week",
        idealFor: "Founders sensing a plateau but unsure why."
    },
    { 
        slug: 'consulting',
        name: 'Consulting Sprint', 
        subtitle: 'The No Magic Formula™',
        desc: "2–4 week strategy sprint. We diagnose the friction and build the brand OS.", 
        cta: "Inquire Now", 
        features: ["Positioning One-Pager", "Audience Map", "Messaging Matrix", "90-Day Roadmap"],
        timeline: "4 Weeks",
        idealFor: "Funded Startups and Scale-ups needing alignment."
    },
    { 
        slug: 'brand-os',
        name: 'Brand OS', 
        subtitle: 'The Full Protocol',
        desc: "Comprehensive brand strategy and systems design. This is your company's operating manual.", 
        cta: "Secure OS", 
        features: ["Positioning Strategy", "Verbal Identity", "Brand Story Spine", "Campaign Pillars", "9-Month Roadmap"],
        timeline: "8 Weeks",
        idealFor: "Companies preparing for Series A/B or major pivots."
    },
    { 
        slug: 'fractional-strategy',
        name: 'Fractional Strategy', 
        subtitle: 'Senior Guidance',
        desc: "Ongoing strategic partnership. We join your executive team as the 'Strategic Brain'.", 
        cta: "Apply for Retainer", 
        features: ["Monthly Advisory", "Campaign Oversight", "Hiring Assistance", "Board Presentation Prep"],
        timeline: "Retainer",
        idealFor: "Established brands needing senior CD leadership."
    }
];

export const DESIGN_POWER_TIERS: DesignPowerTier[] = [
    {
        slug: "foundations",
        name: "Foundations",
        focus: "Visual Identity System",
        desc: "The core aesthetic engine. We build the visual rules that make your brand unmistakable.",
        deliverables: ["Primary & Secondary Logos", "Typography System", "Color Palette", "Basic Brand Guidelines"],
        timeline: "4-6 Weeks",
        idealFor: "Startups needing a professional baseline."
    },
    {
        slug: "flagship",
        name: "Flagship",
        focus: "Full Creative Method™",
        desc: "The complete studio experience. Identity, Custom Webflow build, and signature 3D visuals.",
        deliverables: ["Identity System", "High-End 3D Renders", "Custom Webflow Site", "Motion Guidelines"],
        timeline: "10-12 Weeks",
        idealFor: "Brands ready for market dominance."
    },
    {
        slug: "viz-plus-motion",
        name: "Viz + Motion",
        focus: "Technical Visualization",
        desc: "Surgical 3D visualization and kinetic typography for product-led brands.",
        deliverables: ["4K Product Renders", "Kinetic Type System", "Social Motion Templates", "3D Material Library"],
        timeline: "6-8 Weeks",
        idealFor: "CPG and Tech Hardware brands."
    },
    {
        slug: "retained-power",
        name: "Retained Power",
        focus: "Monthly Senior Unit",
        desc: "Ongoing high-output design partnership. No junior designers, just senior firepower on tap.",
        deliverables: ["Dedicated Design Sprints", "Ongoing Campaign Creative", "Web Maintenance", "Weekly Loom Syncs"],
        timeline: "Monthly",
        idealFor: "Growing companies needing a reliable design partner."
    }
];

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
    {
        slug: 'scale',
        title: 'Scale Partnership',
        description: 'Elite white-label unit for senior agencies.',
        priceLabel: 'Flat Fee',
        details: "We plug into your agency process as the 'Design Power' unit. You handle account management; we handle the craft.",
        idealFor: "Agencies needing high-end 3D and Webflow expertise.",
        deliverables: ["3D Visuals", "UI/UX Design", "Webflow Dev"],
        commitment: "Project-based"
    },
    {
        slug: 'fractional-cd',
        title: 'Fractional CD',
        description: 'Executive creative leadership for in-house teams.',
        priceLabel: 'Monthly',
        details: "We act as your Creative Director, managing your internal team and external vendors to ensure zero visual drift.",
        idealFor: "Scale-ups with junior designers needing senior direction.",
        deliverables: ["Creative Direction", "Review Protocols", "Hiring Specs"],
        commitment: "3 Months Min."
    },
    {
        slug: 'project-spike',
        title: 'Project Spike',
        description: 'Short-term high-intensity creative sprints.',
        priceLabel: 'Project-based',
        details: "A surgical creative strike. We solve one specific complex problem in a high-speed sprint.",
        idealFor: "Brands needing a specific high-impact campaign or launch site.",
        deliverables: ["Sprinted Asset Pack", "Technical Build"],
        commitment: "2-4 Weeks"
    },
    {
        slug: 'equity',
        title: 'Venture Unit',
        description: 'High-risk, high-reward strategic partnership.',
        priceLabel: 'Equity + Fee',
        details: "We invest our design power into early-stage ventures with massive technical or market potential.",
        idealFor: "Pre-seed/Seed founders with world-class products and zero design.",
        deliverables: ["Full Brand Launch", "Product Design", "Pitch Deck V1"],
        commitment: "Long-term"
    }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Strategy', 'Packaging'
];

export const TEAM_MEMBERS: { [key: string]: TeamMember } = {
  franco: {
    name: 'Franco',
    title: 'Creative Director',
    imageUrl: ASSETS.team.franco,
    instagram: 'what.the.franco',
    bio: [
      "The Brains. Franco specializes in Strategy, Art Direction, and 3D Vision.",
      "His 'No Magic Formula' approach strips away the fluff to reveal the raw narrative of a brand.",
      "With over a decade in high-end design, he leads the creative soul of COOLO from Mount Maunganui."
    ],
  },
  ariana: {
    name: 'Ariana',
    title: 'Operations Manager',
    imageUrl: ASSETS.team.ariana,
    instagram: 'ariarmndo',
    bio: [
      "The Engine. Ariana manages execution, logistics, and client sanity.",
      "She ensures the vision is grounded in reality and delivered with surgical precision.",
      "The backbone of COOLO's efficiency."
    ],
  }
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "Script 01: The Trust Cycle",
    date: "2024.11.12",
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    excerpt: "Why micromanagement is actually a symptom of a failed strategy phase.",
    tags: ["Process", "Clients", "Intel"],
    readTime: "4 min read",
    author: "Franco",
    content: "Micromanagement happens when trust is broken or never built. We build trust through a rigid strategy process that makes subjective arguments impossible."
  },
  {
    slug: "3d-as-strategic-asset",
    title: "3D as a Strategic Asset",
    date: "2024.10.05",
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200',
    excerpt: "Moving 3D from 'cool render' to 'conversion tool'.",
    tags: ["3D", "E-commerce", "Strategy"],
    readTime: "6 min read",
    author: "Franco",
    content: "3D visualization isn't just about eye candy. For product-led brands, it's about control. Lighting, materials, and angles that are impossible in physical shoots become repeatable, modular assets."
  },
  {
    slug: "no-magic-formula-logic",
    title: "The Logic of No Magic",
    date: "2024.09.20",
    imageUrl: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=1200',
    excerpt: "Why we killed the 'Creative Guru' trope to save our clients' money.",
    tags: ["Business", "Operations", "Fluff"],
    readTime: "5 min read",
    author: "Franco",
    content: "The 'Creative Guru' model is dangerous. It relies on inspiration, which is fickle. We rely on logic, which is defensible. If your strategy can't survive a stress test of 'Why?', it's just decoration."
  }
];

export const FREE_RESOURCES: Resource[] = [
    {
        id: '01',
        title: 'The Clarity Audit',
        format: 'PDF',
        desc: 'A 15-point checklist to identify narrative leaks in your current brand.',
        link: '#'
    },
    {
        id: '02',
        title: 'No Magic Questionnaire',
        format: 'Notion',
        desc: 'The exact intake form we use to deconstruct high-growth brands.',
        link: '#'
    },
    {
        id: '03',
        title: 'Positioning One-Pager',
        format: 'Template',
        desc: 'A minimalist template to define your core value prop on a single page.',
        link: '#'
    }
];

export const PROCESS_STEPS = [
    { title: 'The Deep Dive', desc: 'Pre-work questionnaire to extract raw materials.', time: 'Phase 01' },
    { title: 'Strategy Intensive', desc: '4-Hour collaborative workshop.', time: 'Phase 02' },
    { title: 'Synthesis', desc: 'We craft the brand playbook.', time: 'Phase 03' },
    { title: 'The Reveal', desc: 'Handoff of the Brand OS.', time: 'Phase 04' }
];

export const FAQ_DATA = [
  {
    category: 'The Unit',
    questions: [
      {
          q: 'What exactly is a "Senior Unit"?',
          a: "It's a high-output, low-overhead model. You work directly with the experts (Franco and Ariana). No account managers, no junior designers learning on your dime. Just senior design power delivered with surgical precision."
      },
      {
          q: 'Who am I actually working with?',
          a: "You work directly with Franco (Strategy & Design) and Ariana (Ops & Execution). We do not have juniors or interns. When you hire COOLO, you hire us."
      },
      {
          q: 'Where are you based?',
          a: "Mount Maunganui, New Zealand. We operate globally from a place that preserves our sanity and fuels our deep work. We are a remote-first studio that values clarity over geography."
      },
      {
          q: 'Do you work with agencies?',
          a: "Yes. We act as an elite white-label 'Design Power' unit for agencies that need to scale their creative output without adding full-time senior headcount."
      },
      {
          q: 'Are you a full-service agency?',
          a: "No. We are a specialized unit. We do Strategy, Identity, 3D, and Webflow. We don't do SEO, PPC, or social media management. We build the engine; you (or your marketing team) drive it."
      }
    ]
  },
  {
    category: 'Economics & Value',
    questions: [
      { 
          q: 'Why is the investment higher than a freelancer?', 
          a: "A freelancer executes tasks. We execute outcomes. You're paying for the strategic seniority that prevents costly re-designs and narrative pivots in 6 months. We build systems, not just assets." 
      },
      {
          q: 'Do you offer fixed pricing?',
          a: "Our core tiers (Clarity Audit, Brand OS, Flagship) have base starting points, but every project is quoted bespoke based on the complexity of your problem. We don't believe in one-size-fits-all pricing for high-end strategy."
      },
      {
          q: 'What is your typical project lead time?',
          a: "Most strategic audits take 1-2 weeks. Full Brand OS builds take 8 weeks. Website and 3D flagship builds are typically 10-12 weeks. Quality requires a certain velocity of logic."
      },
      {
          q: 'Do you offer payment plans?',
          a: "For our larger builds, we typically structure payments in 2-3 milestones. We are a business partner, and we want the terms to reflect a mutual commitment to excellence."
      },
      {
          q: 'Can I pay for just a logo?',
          a: "Generally, no. A logo without a strategy is just decoration. We only take on identity projects that include at least a foundational strategy phase to ensure the visuals actually work for your business."
      }
    ]
  },
  {
      category: 'The Process',
      questions: [
          {
              q: 'Can we skip strategy and go straight to design?',
              a: "No. Design without strategy is guesswork. We won't risk your capital or our reputation on it. If you don't have a clear narrative, we build it first."
          },
          {
              q: 'What is the "No Magic Formula™"?',
              a: "It is our belief that there is no secret sauce—only rigorous logic and deep empathy for the audience. We deconstruct the brand to its soul and rebuild it with high-res precision."
          },
          {
              q: 'How many concepts do we get?',
              a: "We don't 'throw concepts at a wall'. We iterate internally and present the strongest, most logical solution that meets the strategy. We work together to refine that solution until it is perfect."
          },
          {
              q: 'How do we communicate?',
              a: "We use Slack for daily syncs and asynchronous communication. We use Loom for deep-dive walkthroughs of creative work. We keep meetings to a minimum so we can focus on deep work."
          },
          {
              q: 'What happens if I don\'t like the design?',
              a: "By following our 'Logic Locked' strategy process, we align on the 'Why' before we ever touch the 'What'. This almost entirely eliminates the risk of a design mismatch."
          }
      ]
  },
  {
      category: 'Technical & Tools',
      questions: [
          {
              q: 'Why Webflow?',
              a: "Webflow gives us the power of a custom build with the security and speed of a managed platform. It allows for high-end kinetic typography and interactions that standard templates can't handle."
          },
          {
              q: 'What tools do you use for 3D?',
              a: "We use Cinema4D and Redshift for high-end product and environment visualizations. This allows us to create 'impossible' lighting and materials that are repeatable and modular for your brand OS."
          },
          {
              q: 'Do you handle web hosting?',
              a: "We build on Webflow, and hosting is handled through their platform. We help you set everything up and hand over the 'keys' (admin access) once the project is live."
          },
          {
              q: 'Do you provide source files?',
              a: "Yes. Upon final payment, you own all the assets we created. We provide clean, organized source files so you (or your future team) can maintain the system."
          }
      ]
  },
  {
      category: 'Partnership & Scale',
      questions: [
          {
              q: 'Do you work with other creative agencies?',
              a: "Yes. We act as an elite white-label design power unit for senior agencies who need high-res 3D or Webflow execution without adding permanent headcount."
          },
          {
              q: 'What is a Fractional CD?',
              a: "We join your executive team for a set amount of time (usually 3-6 months) to provide senior creative direction. We manage your internal teams, audit your outputs, and ensure zero visual drift."
          },
          {
              q: 'Do you take equity?',
              a: "In very specific cases for early-stage startups where we see massive potential and a perfect strategic fit, we may consider a mix of fee and equity."
          },
          {
              q: 'How do I know if we are a good fit?',
              a: "If you value logic over fluff, speed over bureaucracy, and direct access over agency layers, we will likely work well together."
          }
      ]
  }
];

export const DROPS: Drop[] = [];
export const SCRIPTS_DATA: Script[] = [
    {
        id: 1,
        title: "The Logic Pivot",
        category: "Client Ops",
        dialogue: [
            { speaker: "Client", text: "I'm not sure about this font, can we try something rounder?" },
            { speaker: "You", text: "We can, but looking back at our 'Positioning Pillar 02', our goal was to feel technical and precise. A rounder font softens that edge. Does softening the brand help us win with the target audience?" }
        ],
        overlay: "Strategy is the filter for subjective noise."
    }
];
export const WORKBOOKS: Workbook[] = [];
export const COURSE_MODULES: CourseModule[] = [];

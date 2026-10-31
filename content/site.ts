export const site = {
  name: "Arjun Uvaach",
  show: "The Arjun Vekariya Show",
  tagline: "Real people. Useful lessons. Shared forward.",
  description:
    "Honest conversations about starting over, finding your voice and building a life that matters. Rooted in India. Open to every Australian story.",
  url: "https://arjunuvaach.com",
  youtube: "https://www.youtube.com/@ArjunUvaacha",
  youtubeLabel: "Watch on YouTube",
  host: {
    name: "Arjun Vekariya",
    short:
      "को हि भारः समर्थानां किं दूरं व्यवसायिनाम्।\nको विदेशः सविद्यानां कः परः प्रियवादिनाम्॥\nचाणक्य नीति (अध्याय 3, श्लोक 13)",
    location: "Perth · Western Australia",
    role: "Host, Arjun Uvaach · Owner, BARK Subiaco",
    arrived: "July 2022",
    venue: "BARK Subiaco",
    intro:
      "I’m Arjun. I’m building Arjun Uvaach to share the stories of people who started again in Australia — the mistakes, turning points and lessons that can help the next person find their way.",
    copyIntro:
      "I’m Arjun, based in Perth. I moved from India to Australia in 2022, and today I run BARK Subiaco. I’m building Arjun Uvaach to share the stories of people who started again here: the mistakes, turning points and lessons that can help the next person find their way.",
    story: [
      "I moved from India to Australia in July 2022. Today I run BARK Subiaco in Perth. Like so many people who start again, I’m learning as I go.",
      "Arjun Uvaach is my way of asking the questions I wish I could have asked when I first arrived. How did you begin? What went wrong? Who helped? What would you do differently?",
      "I’m building a home for those conversations, so that someone else’s hard-earned experience can become the next person’s head start.",
    ],
    questions: [
      "What do you wish someone had told you before you arrived?",
      "Which mistake taught you the most?",
      "What does “making it” mean to you now?",
    ],
  },
  ticker: ["Indian roots", "Australian journeys", "A shared future"],
  acknowledgement:
    "We acknowledge the Aboriginal and Torres Strait Islander peoples as the First Peoples and Traditional Custodians of the lands on which these stories unfold. We pay respect to Elders past and present.",
  footerNote: "India in our hearts. Australia in our everyday.",
  badge: "Stories in motion",
  year: 2026,
  nav: [
    { href: "/#beginning", label: "The beginning" },
    { href: "/#journey", label: "Our journey" },
    { href: "/#atlas", label: "The atlas" },
    { href: "/#host", label: "Meet Arjun" },
  ],
} as const;

export const states = [
  { id: "WA", name: "Western Australia", capital: "Perth" },
  { id: "VIC", name: "Victoria", capital: "Melbourne" },
  { id: "NSW", name: "New South Wales", capital: "Sydney" },
  { id: "QLD", name: "Queensland", capital: "Brisbane" },
  { id: "SA", name: "South Australia", capital: "Adelaide" },
  { id: "TAS", name: "Tasmania", capital: "Hobart" },
  { id: "NT", name: "Northern Territory", capital: "Darwin" },
  { id: "ACT", name: "Australian Capital Territory", capital: "Canberra" },
] as const;

export const groupLabels: Record<string, string> = {
  parliament: "In public life",
  mission: "Indian mission",
  history: "From the archive",
  host: "Your host",
  leader: "Community & leadership",
  pending: "Suggested by Arjun",
  legacy: "Legacy & remembrance",
};

export const defaultQuestions = [
  "What shaped the beginning of your journey?",
  "Which lesson would you pass on to the next generation?",
];

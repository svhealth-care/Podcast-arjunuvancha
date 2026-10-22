export type PersonGroup =
  | "leader"
  | "parliament"
  | "history"
  | "host"
  | "mission"
  | "legacy"
  | "pending";

export type Source = {
  url: string;
  label: string;
};

export type Person = {
  id: string;
  name: string;
  state?: string;
  states?: string[];
  location?: string;
  city?: string;
  role: string;
  bio: string;
  group: PersonGroup;
  image?: string | null;
  imagePosition?: string;
  sources?: Source[];
  tags?: string[];
  shortlisted?: boolean;
  rosterOrder?: number;
  priority?: number;
  chamber?: string;
  office?: string;
  heritage?: string;
  credit?: string;
  jurisdiction?: string;
  honorary?: boolean;
  questions?: string[];
  detail?: string[];
  portraitSource?: string | null;
  guestStatus?: string;
};

export type Directory = {
  reviewed: string;
  scope: string;
  people: Person[];
  missions: Person[];
  pending: Person[];
};

export type Conversation = {
  slug: string;
  number: string;
  title: string;
  guestId: string;
  status: "coming" | "watch";
  duration: string;
  question: string;
  lesson: string;
};

export type StateId = "WA" | "NT" | "SA" | "QLD" | "NSW" | "VIC" | "TAS" | "ACT";

import type { Conversation, Person } from "@/lib/types";
import { conversationQuestions, hostPerson, shortlistedPeople } from "@/lib/people";

const titles: Record<string, { title: string; question: string; lesson: string }> = {
  "kamlesh-bhatt": {
    title: "The long conversation of family medicine",
    question: "What does it mean to know a family across years, not appointments?",
    lesson: "Care compounds when you stay long enough to watch a life unfold.",
  },
  "jyothi-tegginamath": {
    title: "Bridging two life-science worlds",
    question: "What did you have to unlearn when you started building between India and Australia?",
    lesson: "Partnerships work when someone can translate both the science and the culture.",
  },
  "nilesh-makwana": {
    title: "Culture, film and a digital Australia",
    question: "Where did you first feel you belonged in Perth?",
    lesson: "A city becomes home when you help other people see themselves in it.",
  },
  varun: {
    title: "A public voice across generations",
    question: "How do family stories shape a sense of public responsibility?",
    lesson: "Belonging is also the work the next generation chooses to do in public.",
  },
  "parwinder-kaur": {
    title: "Science, Punjab and a seat in the west",
    question: "What would you tell a young migrant who wants to work in science?",
    lesson: "Expertise can open a door; service is how you stay in the room.",
  },
  "ranjana-srivastava": {
    title: "The humanity inside the clinic",
    question: "What did your childhood teach you to notice in other people?",
    lesson: "Medicine is technical. Healing is still a conversation.",
  },
  "tejinder-pal-singh": {
    title: "A kitchen that feeds a city",
    question: "When did feeding strangers become a public duty?",
    lesson: "Community is often built with a ladle before it is built with a microphone.",
  },
  "charishma-kaliyanda": {
    title: "From Bengaluru to Liverpool",
    question: "What does starting again look like when the work is public?",
    lesson: "A local seat can still carry a journey across oceans.",
  },
};

function firstSentence(text: string) {
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match?.[0] ?? text).trim();
}

function displayName(person: Person) {
  return person.name.replace(/^(Dr\.?|Professor|Prof\.?)\s+/i, "");
}

export function conversations(): Conversation[] {
  const host = hostPerson();
  const guests = shortlistedPeople();
  const items: Conversation[] = [];

  if (host) {
    items.push({
      slug: "the-courage-to-begin-again",
      number: "00",
      title: "The courage to begin again",
      guestId: host.id,
      status: "watch",
      duration: "Host note",
      question: "What do you wish someone had told you before you arrived?",
      lesson: "Someone else’s hard-earned experience can become the next person’s head start.",
    });
  }

  guests.forEach((person, index) => {
    const extra = titles[person.id];
    const questions = conversationQuestions(person);
    items.push({
      slug: person.id,
      number: String(index + 1).padStart(2, "0"),
      title: extra?.title ?? `A conversation with ${displayName(person)}`,
      guestId: person.id,
      status: "coming",
      duration: "Coming conversation",
      question: extra?.question ?? questions[0],
      lesson: extra?.lesson ?? firstSentence(person.bio),
    });
  });

  return items;
}

export function getConversation(slug: string) {
  return conversations().find((item) => item.slug === slug);
}

export function featuredConversations() {
  return conversations().slice(0, 5);
}

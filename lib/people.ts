import directoryData from "@/content/directory.json";
import { defaultQuestions, groupLabels, states } from "@/content/site";
import type { Directory, Person } from "@/lib/types";
import { publicImage } from "@/lib/media";

const directory = directoryData as Directory;

export const people: Person[] = directory.people;
export const missions: Person[] = directory.missions;
export const directoryScope = directory.scope;
export const directoryReviewed = directory.reviewed;

export const everyone: Person[] = [...people, ...missions];

export function getPerson(id: string) {
  return everyone.find((person) => person.id === id);
}

export function shortlistedPeople() {
  return people
    .filter((person) => person.shortlisted && person.group !== "host")
    .sort((a, b) => (a.rosterOrder ?? a.priority ?? 50) - (b.rosterOrder ?? b.priority ?? 50));
}

export function parliamentarians() {
  return people.filter((person) => person.group === "parliament" && person.id !== "varun");
}

export function hostPerson() {
  return people.find((person) => person.group === "host");
}

export function peopleForState(state: string) {
  return people.filter((person) => person.state === state);
}

export function missionsForState(state: string) {
  return missions.filter((person) => person.states?.includes(state));
}

export function personHref(_person: Person) {
  return "/#atlas";
}

export function personImage(person: Person) {
  return publicImage(person.image);
}

export function personKind(person: Person) {
  return groupLabels[person.group] ?? "A voice worth knowing";
}

export function stateName(id?: string) {
  return states.find((state) => state.id === id)?.name ?? id ?? "Australia";
}

export function conversationQuestions(person: Person) {
  return person.questions?.length ? person.questions : defaultQuestions;
}

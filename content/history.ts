export const historySources = {
  history:
    "https://www.homeaffairs.gov.au/mca/files/2016-cis-india.PDF",
  population:
    "https://www.homeaffairs.gov.au/research-and-statistics/statistics/country-profiles/profiles/india",
  restriction:
    "https://www.nma.gov.au/defining-moments/resources/white-australia-policy",
  ending:
    "https://www.nma.gov.au/defining-moments/resources/end-of-white-australia-policy",
  ellum:
    "https://www.naa.gov.au/students-and-teachers/learning-resources/learning-resource-themes/society-and-culture/migration-and-multiculturalism/identification-photograph-indian-migrant-ellum-deen",
  anzacs: "https://www.awm.gov.au/articles/blog/remembering-sikhs",
  consulates: "https://protocol.dfat.gov.au/Public/Consulates/91/State",
  highCommission: "https://protocol.dfat.gov.au/Public/Missions/91",
};

export const eras = [
  {
    year: "1800–1860",
    short: "Early arrivals",
    heading: "Before the boarding pass.",
    body: "The documented history reaches back to the early 1800s. Indians came to the Australian colonies as labourers and domestic workers, long before the migration pathways familiar today.",
    source: historySources.history,
    sourceName: "Department of Home Affairs — historical background",
    label: "Across the Indian Ocean",
  },
  {
    year: "1860–1901",
    short: "Country roads",
    heading: "A new life, one town at a time.",
    body: "Indian workers and hawkers made their way into country towns and agricultural districts. Some worked on the goldfields. Travelling traders carried goods to people far from the shops.",
    source: historySources.history,
    sourceName: "Department of Home Affairs — historical background",
    label: "From arrival ports to country communities",
  },
  {
    year: "1901",
    short: "Doors restricted",
    heading: "Belonging met a barrier.",
    body: "The Immigration Restriction Act formalised the White Australia policy. The dictation test was used to exclude people, and migrants already here could face uncertainty about leaving and returning.",
    source: historySources.restriction,
    sourceName: "National Museum of Australia",
    label: "A journey made harder by exclusion",
  },
  {
    year: "1966–1973",
    short: "A changing Australia",
    heading: "The door begins to open.",
    body: "Reforms in 1966 marked a significant step away from race-based migration. In 1973 the Australian Government definitively renounced the White Australia policy, helping open a new chapter.",
    source: historySources.ending,
    sourceName: "National Museum of Australia",
    label: "A new chapter of migration",
  },
  {
    year: "Today",
    short: "Lives being built",
    heading: "More than a journey. A contribution.",
    body: "Families, students, professionals and business owners continue this story. Home Affairs estimated 916,300 India-born residents at June 2024. Behind that dated estimate are individual lives worth understanding.",
    source: historySources.population,
    sourceName: "Home Affairs — June 2024 population estimate",
    label: "Two lands. Countless individual stories.",
  },
] as const;

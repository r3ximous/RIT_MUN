export type CommitteeDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type CommitteeFormat = "Crisis" | "General Assembly" | "Specialized";

export const difficultyDescriptions: Record<CommitteeDifficulty, string> = {
  Beginner:
    "A good first committee. The pace leaves room to learn the procedure as you go, and no previous Model UN experience is expected.",
  Intermediate:
    "Best if you have attended at least one conference and are comfortable giving speeches and drafting clauses.",
  Advanced:
    "Recommended for experienced delegates who are confident with procedure and can adapt quickly as the situation changes.",
};

export const formatExplanations: Record<
  CommitteeFormat,
  { heading: string; description: string }
> = {
  Crisis: {
    heading: "How a crisis committee works",
    description:
      "Crisis committees are smaller and faster than a General Assembly. The situation changes while you debate: the dais introduces updates, and delegates respond with short written directives instead of one long resolution. Expect to think on your feet.",
  },
  "General Assembly": {
    heading: "How a General Assembly committee works",
    description:
      "General Assembly committees follow standard Model UN procedure: a speakers’ list, moderated and unmoderated caucuses, working papers and finally draft resolutions that the committee votes on. Building a bloc of countries that support your ideas is the heart of it.",
  },
  Specialized: {
    heading: "How a specialized agency works",
    description:
      "Specialized agencies focus on a single policy area. Debate follows standard Model UN procedure, and the strongest delegates bring practical, well-researched proposals rather than broad statements.",
  },
};

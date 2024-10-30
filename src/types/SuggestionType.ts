export type SuggestionType = {
  title: string;
  description: string;
};

export type RoutineType = SuggestionType & {
  image: string;
  altDescription: string;
};

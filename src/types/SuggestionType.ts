export type SuggestionType = {
  title: string;
  description: string;
};

export type RoutineType = SuggestionType & {
  images: {
    image: string;
    altDescription: string;
  }[];
};

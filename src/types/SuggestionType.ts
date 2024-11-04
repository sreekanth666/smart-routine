export type SuggestionType = {
  title: string;
  description: string;
};

export type RoutineType = SuggestionType & {
  id: number;
  images: {
    image: string;
    altDescription: string;
  }[];
};

export type RoutineTypeWithoutId = Omit<RoutineType, "id">;

export type SuggestionType = {
  title: string;
  description: string;
};

export type Imagetype = {
  image: string;
  altDescription: string;
};

export type RoutineType = SuggestionType & {
  id: number;
  images: Imagetype[];
};

export type RoutineTypeWithoutId = Omit<RoutineType, "id">;

export type RoutineTypeWithoutIdAndImages = Omit<
  RoutineTypeWithoutId,
  "images"
>;

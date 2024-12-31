export type SuggestionType = {
  title: string;
  description: string;
};

type RoutineDataType = SuggestionType & {
  time: string;
};

export type Imagetype = {
  image: string;
  altDescription: string;
};

export type RoutineType = RoutineDataType & {
  id: string;
  images: Imagetype[];
};

export type RoutineTypeWithoutId = Omit<RoutineType, "id">;

export type RoutineTypeWithoutIdAndImages = Omit<
  RoutineTypeWithoutId,
  "images"
>;

export type GoalType = {
  id: string;
  goal: string;
  didAchieve: boolean;
};

export type DailyActivity = {
  id: string;
  title: string;
  description: string;
};

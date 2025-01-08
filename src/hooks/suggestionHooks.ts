import { useQuery } from "@tanstack/react-query";
import {
  getMentalHealthSuggestions,
  getPersonalisedSuggestions,
} from "../services/apiSuggestions";

export function useGetMentalHealthSuggestions() {
  const {
    isLoading: isGettingMentalHealthSuggestions,
    data: mentalHealthSuggestions,
    error: mentalHealthSuggestionsError,
  } = useQuery({
    queryKey: ["mentalHealthSuggestions"],
    queryFn: () => getMentalHealthSuggestions(),
    staleTime: 900000,
  });

  return {
    isGettingMentalHealthSuggestions,
    mentalHealthSuggestions,
    mentalHealthSuggestionsError,
  };
}

export function useGetPersonalisedSuggestions() {
  const {
    isLoading: isGettingPersonalisedSuggestions,
    data: personalisedSuggestions,
    error: personalisedSuggestionsError,
  } = useQuery({
    queryKey: ["personalisedSuggestions"],
    queryFn: () => getPersonalisedSuggestions(),
  });

  return {
    isGettingPersonalisedSuggestions,
    personalisedSuggestions,
    personalisedSuggestionsError,
  };
}

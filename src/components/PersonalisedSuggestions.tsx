import {
  Accordion,
  Divider,
  ScrollArea,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";
import SuggestionItemV2 from "./SuggestionItemV2";
import { useEffect, useState } from "react";
import { useGetPersonalisedSuggestions } from "../hooks/suggestionHooks";

type GoalOptimization = {
  goal: string;
  suggestion: string;
  benefit: string;
};

type ActivityImprovement = {
  activity: string;
  suggestion: string;
  benefit: string;
};

type LifestyleAdjustment = {
  adjustment: string;
  benefit: string;
};

type PersonalisedSuggestionsType = {
  goalOptimizations: GoalOptimization[];
  activityImprovements: ActivityImprovement[];
  lifestyleAdjustments: LifestyleAdjustment[];
};

function PersonalisedSuggestions() {
  const [userPersonalisedSuggestions, setUserPersonalisedSuggestions] =
    useState<PersonalisedSuggestionsType | null>(null);
  const {
    isGettingPersonalisedSuggestions,
    personalisedSuggestions,
    personalisedSuggestionsError,
  } = useGetPersonalisedSuggestions();

  useEffect(() => {
    if (
      !isGettingPersonalisedSuggestions &&
      personalisedSuggestionsError === null
    ) {
      const serverData: PersonalisedSuggestionsType =
        personalisedSuggestions?.data;
      setUserPersonalisedSuggestions({
        goalOptimizations: serverData.goalOptimizations,
        activityImprovements: serverData.activityImprovements,
        lifestyleAdjustments: serverData.lifestyleAdjustments,
      });
    }
  }, [
    isGettingPersonalisedSuggestions,
    personalisedSuggestionsError,
    personalisedSuggestions,
  ]);

  const goalOptimizations = userPersonalisedSuggestions?.goalOptimizations.map(
    (optimizationItem) => (
      <SuggestionItemV2
        key={optimizationItem.goal}
        title={optimizationItem.goal}
      >
        <>
          <Text>{`👍 ${optimizationItem.benefit}`}</Text>
          <Divider my="xs" />
          <Text>{`💯 ${optimizationItem.suggestion}`}</Text>
        </>
      </SuggestionItemV2>
    )
  );

  const activityImprovements =
    userPersonalisedSuggestions?.activityImprovements.map((activityItem) => (
      <SuggestionItemV2
        key={activityItem.activity}
        title={activityItem.activity}
      >
        <>
          <Text>{`💡 ${activityItem.benefit}`}</Text>
          <Divider my="xs" />
          <Text>{`✅ ${activityItem.suggestion}`}</Text>
        </>
      </SuggestionItemV2>
    ));

  const lifestyleAdjustments =
    userPersonalisedSuggestions?.lifestyleAdjustments.map((adjustmentItem) => (
      <SuggestionItem
        key={adjustmentItem.adjustment}
        item={{
          title: adjustmentItem.adjustment,
          description: `✅ ${adjustmentItem.benefit}`,
        }}
      />
    ));

  if (isGettingPersonalisedSuggestions) {
    return (
      <SuggestionContainerCard title="Personalised Suggestions">
        <>
          <Skeleton height={15}></Skeleton>
          <Skeleton height={15}></Skeleton>
          <Skeleton height={15}></Skeleton>
          <Skeleton height={15}></Skeleton>
        </>
      </SuggestionContainerCard>
    );
  }

  if (personalisedSuggestionsError !== null) {
    return (
      <SuggestionContainerCard title="Personalised Suggestions">
        <Title order={4} c="red">
          Error: Something bad happened at retrieving personalised suggestions
        </Title>
      </SuggestionContainerCard>
    );
  }

  if (userPersonalisedSuggestions === null) {
    return (
      <SuggestionContainerCard title="Personalised Suggestions">
        <Title order={4}>
          No personalised suggestion available. Please add some activity data.
        </Title>
      </SuggestionContainerCard>
    );
  }

  return (
    <SuggestionContainerCard title="Personalized Suggestions">
      <ScrollArea h={330} scrollbarSize={2} scrollHideDelay={0}>
        <Title order={4} mb="xs">
          Goal Optimizations
        </Title>
        <Accordion variant="separated">{goalOptimizations}</Accordion>
        <Divider my="sm" />
        <Title order={4} mb="xs">
          Lifestyle Adjustments
        </Title>
        <Accordion variant="separated">{lifestyleAdjustments}</Accordion>
        <Divider my="sm" />
        <Title order={4} mb="xs">
          Activity Improvements
        </Title>
        <Accordion variant="separated">{activityImprovements}</Accordion>
      </ScrollArea>
    </SuggestionContainerCard>
  );
}

export default PersonalisedSuggestions;

import { Accordion, Divider, ScrollArea, Skeleton, Title } from "@mantine/core";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";
import { useEffect, useState } from "react";
import { useGetMentalHealthSuggestions } from "../hooks/suggestionHooks";

type Stressor = {
  type: string;
  description: string;
};

type CopingStrategy = {
  strategy: string;
  explanation: string;
};

type LifestyleAdjustment = {
  adjustment: string;
  benefit: string;
};

type MentalHealthSuggestions = {
  stressors: Stressor[];
  copingStrategies: CopingStrategy[];
  lifestyleAdjustments: LifestyleAdjustment[];
};

function MentalHealth() {
  const [userMentalHealthSuggestions, setUserMentalHealthSuggestions] =
    useState<MentalHealthSuggestions | null>(null);
  const {
    isGettingMentalHealthSuggestions,
    mentalHealthSuggestions,
    mentalHealthSuggestionsError,
  } = useGetMentalHealthSuggestions();

  useEffect(() => {
    if (
      !isGettingMentalHealthSuggestions &&
      mentalHealthSuggestionsError === null
    ) {
      const serverData: MentalHealthSuggestions = mentalHealthSuggestions?.data;
      setUserMentalHealthSuggestions({
        stressors: serverData.stressors,
        copingStrategies: serverData.copingStrategies,
        lifestyleAdjustments: serverData.lifestyleAdjustments,
      });
    }
  }, [
    isGettingMentalHealthSuggestions,
    mentalHealthSuggestions,
    mentalHealthSuggestionsError,
  ]);

  const stressors = userMentalHealthSuggestions?.stressors.map(
    (stressorItem) => (
      <SuggestionItem
        key={stressorItem.type}
        item={{
          title: stressorItem.type,
          description: `🔍 ${stressorItem.description}`,
        }}
      />
    )
  );

  const copingStrategies = userMentalHealthSuggestions?.copingStrategies.map(
    (strategyItem) => (
      <SuggestionItem
        key={strategyItem.strategy}
        item={{
          title: strategyItem.strategy,
          description: `🟢 ${strategyItem.explanation}`,
        }}
      />
    )
  );

  const lifestyleAdjustments =
    userMentalHealthSuggestions?.lifestyleAdjustments.map((adjustmentItem) => (
      <SuggestionItem
        key={adjustmentItem.adjustment}
        item={{
          title: adjustmentItem.adjustment,
          description: `🔧 ${adjustmentItem.benefit}`,
        }}
      />
    ));

  if (isGettingMentalHealthSuggestions) {
    return (
      <SuggestionContainerCard title="Mental Health Suggestions">
        <>
          <Skeleton height={50} my="md"></Skeleton>
          <Skeleton height={50} my="md"></Skeleton>
          <Skeleton height={50} my="md"></Skeleton>
          <Skeleton height={50} my="md"></Skeleton>
        </>
      </SuggestionContainerCard>
    );
  }

  if (mentalHealthSuggestionsError !== null) {
    return (
      <SuggestionContainerCard title="Mental Health Suggestions">
        <Title order={4} c="red">
          Error: Something bad happened at retrieving mental health suggestions
        </Title>
      </SuggestionContainerCard>
    );
  }

  if (userMentalHealthSuggestions === null) {
    return (
      <SuggestionContainerCard title="Mental Health Suggestions">
        <Title order={4}>
          No mental health suggestion available. Please add some activity data.
        </Title>
      </SuggestionContainerCard>
    );
  }

  return (
    <SuggestionContainerCard title="Mental Health Suggestions">
      <ScrollArea h={330} scrollbarSize={2} scrollHideDelay={0}>
        <Title order={4} mb="xs">
          Stressors
        </Title>
        <Accordion variant="separated">{stressors}</Accordion>
        <Divider my="sm" />
        <Title order={4} mb="xs">
          Coping Strategies
        </Title>
        <Accordion variant="separated">{copingStrategies}</Accordion>
        <Divider my="sm" />
        <Title order={4} mb="xs">
          Lifestyle Adjustments
        </Title>
        <Accordion variant="separated">{lifestyleAdjustments}</Accordion>
      </ScrollArea>
    </SuggestionContainerCard>
  );
}

export default MentalHealth;

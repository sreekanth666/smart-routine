import { RoutineType, SuggestionType } from "../types/SuggestionType";

export const SAMPLE_PERSONALISED_SUGGESTIONS: SuggestionType[] = [
  {
    title: "Identify Tasks",
    description: "List essential tasks for the day",
  },
  {
    title: "Match with Energy Levels",
    description: "Align tasks with times when you feel most energized.",
  },
  {
    title: "Set Specific Goals",
    description: "Define clear goals and assign time slots for each.",
  },
  {
    title: "Build in Flexibility",
    description: "Leave some room for adjustments or unexpected tasks.",
  },
];

export const SAMPLE_MENTAL_HEALTH_SUGGESTIONS: SuggestionType[] = [
  {
    title: "Practice Gratitude",
    description:
      "Start a daily gratitude journal to shift focus toward positive aspects of life.",
  },
  {
    title: "Prioritize Sleep",
    description:
      "Aim for a regular sleep schedule to boost mood and cognitive function.",
  },
  {
    title: "Stay Physically Active",
    description:
      "Engage in physical exercise, as it releases endorphins and reduces stress.",
  },
  {
    title: "Mindful Breathing",
    description:
      "Incorporate deep breathing exercises to manage stress levels.",
  },
];

export const SAMPLE_SUSTAINABILITY_INSIGHTS: SuggestionType[] = [
  {
    title: "Self-Care",
    description:
      "Switch to reusable cotton pads. Replace single-use cotton pads with washable ones to reduce waste.",
  },
  {
    title: "Home Care",
    description:
      "Use wooden hangers. Wooden hangers last longer and are eco-friendly compared to plastic options.",
  },
  {
    title: "Kitchen Tips",
    description:
      "Opt for beeswax wraps instead of plastic. Beeswax wraps are reusable, helping cut down on plastic waste.",
  },
  {
    title: "Shopping",
    description:
      "Choose refillable products. Reduce plastic waste by opting for refillable containers for household items.",
  },
];

export const SAMPLE_GOALS: SuggestionType[] = [
  {
    title: "Improve Health",
    description:
      "Focus on regular exercise and balanced nutrition for a healthier lifestyle.",
  },
  {
    title: "Build Financial Security",
    description:
      "Set a budget and save consistently to achieve financial stability.",
  },
  {
    title: "Learn a New Skill",
    description:
      "Challenge yourself with a new language, instrument, or technical skill to expand your abilities.",
  },
  {
    title: "Strengthen Relationships",
    description:
      "Spend quality time with loved ones to build deeper connections.",
  },
  {
    title: "Advance Your Career",
    description:
      "Pursue training or networking opportunities to grow professionally.",
  },
  {
    title: "Practice Mindfulness",
    description:
      "Integrate meditation or journaling into your day for mental clarity.",
  },
  {
    title: "Organize Your Space",
    description:
      "Declutter and arrange your environment for a more efficient, peaceful life.",
  },
  {
    title: "Give Back",
    description:
      "Volunteer or support causes that align with your values to make a positive impact.",
  },
];

export const SAMPLE_ROUTINES: RoutineType[] = [
  {
    id: 1,
    title: "Morning Mindfulness",
    description:
      "Start the day with 10 minutes of meditation and deep breathing.",
    images: [
      { image: "/images/meditation1.webp", altDescription: "Meditation1" },
      { image: "/images/meditation2.webp", altDescription: "Meditation2" },
      { image: "/images/meditation3.webp", altDescription: "Meditation3" },
      { image: "/images/meditation4.webp", altDescription: "Meditation4" },
    ],
  },
  {
    id: 2,
    title: "Daily Exercise",
    description:
      "Dedicate 30 minutes to a workout or outdoor activity to stay fit.",
    images: [
      { image: "/images/exercise1.webp", altDescription: "Exercise1" },
      { image: "/images/exercise2.webp", altDescription: "Exercise2" },
      { image: "/images/exercise3.webp", altDescription: "Exercise3" },
      { image: "/images/exercise4.webp", altDescription: "Exercise4" },
    ],
  },
  {
    id: 3,
    title: "Learning Hour",
    description:
      "Spend one hour reading, studying, or watching educational content.",
    images: [
      { image: "/images/learning1.webp", altDescription: "Learning1" },
      { image: "/images/learning2.webp", altDescription: "Learning2" },
      { image: "/images/learning3.webp", altDescription: "Learning3" },
      { image: "/images/learning4.webp", altDescription: "Learning4" },
    ],
  },
  {
    id: 4,
    title: "Healthy Meal Prep",
    description:
      "Prepare balanced meals for the day with wholesome ingredients.",
    images: [
      { image: "/images/cooking1.webp", altDescription: "Cooking1" },
      { image: "/images/cooking2.webp", altDescription: "Cooking2" },
      { image: "/images/cooking3.webp", altDescription: "Cooking3" },
      { image: "/images/cooking4.webp", altDescription: "Cooking4" },
    ],
  },
  {
    id: 5,
    title: "Evening Journal",
    description:
      "Reflect on the day by writing down thoughts, goals, and gratitude.",
    images: [
      { image: "/images/journal1.webp", altDescription: "Writing Journal1" },
      { image: "/images/journal2.webp", altDescription: "Writing Journal2" },
      { image: "/images/journal3.webp", altDescription: "Writing Journal3" },
      { image: "/images/journal4.webp", altDescription: "Writing Journal4" },
    ],
  },
  {
    id: 6,
    title: "Creative Session",
    description:
      "Set aside 20 minutes to explore a hobby or work on a creative project.",
    images: [
      { image: "/images/hobby1.webp", altDescription: "Hobby1" },
      { image: "/images/hobby2.webp", altDescription: "Hobby2" },
      { image: "/images/hobby3.webp", altDescription: "Hobby3" },
      { image: "/images/hobby4.webp", altDescription: "Hobby4" },
    ],
  },
  {
    id: 7,
    title: "Tech-Free Time",
    description:
      "Take a break from screens for 30 minutes to unwind and recharge.",
    images: [
      { image: "/images/reading1.webp", altDescription: "Reading1" },
      { image: "/images/reading2.webp", altDescription: "Reading2" },
      { image: "/images/reading3.webp", altDescription: "Reading3" },
      { image: "/images/reading4.webp", altDescription: "Reading4" },
    ],
  },
  {
    id: 8,
    title: "Weekly Goal Setting",
    description:
      "Every Sunday, outline goals for the upcoming week to stay focused.",
    images: [
      {
        image: "/images/todo1.webp",
        altDescription: "Weekly Goals ToDo List1",
      },
      {
        image: "/images/todo2.webp",
        altDescription: "Weekly Goals ToDo List2",
      },
      {
        image: "/images/todo3.webp",
        altDescription: "Weekly Goals ToDo List3",
      },
      {
        image: "/images/todo4.webp",
        altDescription: "Weekly Goals ToDo List4",
      },
    ],
  },
  {
    id: 9,
    title: "Nightly Cleanup",
    description:
      "Spend 10 minutes tidying up to ensure a fresh start for the next day.",
    images: [
      { image: "/images/cleaning1.webp", altDescription: "Cleaning1" },
      { image: "/images/cleaning2.webp", altDescription: "Cleaning2" },
      { image: "/images/cleaning3.webp", altDescription: "Cleaning3" },
      { image: "/images/cleaning4.webp", altDescription: "Cleaning4" },
    ],
  },
  {
    id: 10,
    title: "Social Check-In",
    description:
      "Connect with friends or family daily for 10-15 minutes to nurture relationships.",
    images: [
      {
        image: "/images/friends1.webp",
        altDescription: "Connect With Friends1",
      },
      {
        image: "/images/friends2.webp",
        altDescription: "Connect With Friends2",
      },
      {
        image: "/images/friends3.webp",
        altDescription: "Connect With Friends3",
      },
      {
        image: "/images/friends4.webp",
        altDescription: "Connect With Friends4",
      },
    ],
  },
];

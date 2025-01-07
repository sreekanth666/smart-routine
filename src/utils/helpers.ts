import { ServerRoutineAnalysisData } from "../components/RoutineChat";
import { Imagetype } from "../types/SuggestionType";

export function isCurrentPage(
  pathName: string,
  conditionString: string
): boolean {
  return pathName.endsWith(conditionString);
}

export function checkPassword(password: string): string | null {
  if (password.length < 6) return "Password must have at least 6 characters";
  if (password.length > 14) return "Password must have at most 14 characters";
  if (!/[A-Z]/.test(password))
    return "Password must have at least 1 uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must have at least 1 lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least 1 number";
  if (!/[!@#$%^&*]/.test(password))
    return "Password must contain at least 1 special character";
  return null;
}

export function generateRandomID(): string {
  return "_" + Math.random().toString(36).substring(2, 9);
}

export const isFile = (file: File | Imagetype): file is File => {
  return file instanceof File;
};

export const convertAnalysisData = (
  serverData: ServerRoutineAnalysisData
): string => {
  const productAnalysis = serverData.routineAnalysis[0].products
    .map((productItem) => {
      return `<div><strong>Product:</strong> ${productItem.product}</div><br>
<div><strong>Category:</strong> ${productItem.category}</div><br>
<div><strong>Good:</strong> ${productItem.good}</div><br>
<div><strong>Bad:</strong> ${productItem.bad}</div><br>
<div><strong>Recommendation:</strong> ${productItem.recommendation}</div><br>
<hr>`;
    })
    .join("");
  console.log(productAnalysis);
  const message: string = `<strong>Time:</strong> ${serverData.routineAnalysis[0].time}</strong><br>
${productAnalysis}<br>
<strong>Overall Feedback</strong><br>
<div><strong>Good Summary:</strong> ${serverData.overallFeedback.goodsSummary}</div><br>
<div><strong>Bad Summary:</strong> ${serverData.overallFeedback.badsSummary}</div><br>
<div><strong>General Recommendations:</strong> ${serverData.overallFeedback.generalRecommendations}</div><br>`;
  return message;
};

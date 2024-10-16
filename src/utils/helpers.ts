export function isCurrentPage(
  pathName: string,
  conditionString: string
): boolean {
  return pathName.endsWith(conditionString);
}

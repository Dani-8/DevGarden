let communityWaterScore = 25;

export function getStarTreeScore(): number {
  return communityWaterScore;
}

export function waterStarTreeScore(increment: number = 1): number {
  const inc = Math.min(Math.max(Number(increment || 1), 1), 10);
  communityWaterScore += inc;
  return communityWaterScore;
}

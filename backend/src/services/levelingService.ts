export interface GitHubStats {
  commits: number;
  stars: number;
  followers: number;
  repos: number;
  account_age_years: number;
}

export interface LevelInfo {
  score: number;
  level: number;
  title: string;
  visual_tier: string; // e.g. "green", "blue", "purple", "crimson", "cosmic"
}

export function calculateLevel(stats: GitHubStats): LevelInfo {
  const { commits, stars, followers, repos, account_age_years } = stats;

  const score = Math.floor(
    (commits * 0.5) +
    (stars * 5.0) +
    (followers * 2.0) +
    (repos * 1.0) +
    (account_age_years * 10.0)
  );

  const calculatedLevel = Math.min(50, Math.max(1, Math.floor(Math.sqrt(score / 5) + 1)));

  let title = 'Sprout';
  let visual_tier = 'green';

  if (calculatedLevel >= 40) {
    title = 'Legend';
    visual_tier = 'cosmic';
  } else if (calculatedLevel >= 30) {
    title = 'Arch Mage';
    visual_tier = 'crimson';
  } else if (calculatedLevel >= 20) {
    title = 'Maintainer';
    visual_tier = 'purple';
  } else if (calculatedLevel >= 10) {
    title = 'Committer';
    visual_tier = 'blue';
  }

  return {
    score,
    level: calculatedLevel,
    title,
    visual_tier,
  };
}

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

  // Leveling Score Formula
  // - Commits last year are highly valuable but frequent: 0.5 points each
  // - Stars received are prestigious and hard to get: 5 points each
  // - Followers represent social reach: 2 points each
  // - Public repositories: 1 point each
  // - Experience (account age): 10 points per year
  const score = Math.floor(
    (commits * 0.5) +
    (stars * 5.0) +
    (followers * 2.0) +
    (repos * 1.0) +
    (account_age_years * 10.0)
  );

  // Calculate Level from 1 to 50 using a progressive quadratic scale
  // level = Math.floor(Math.sqrt(score / 5) + 1)
  // Level 1: Score 0-4
  // Level 5: Score 80
  // Level 10: Score 405
  // Level 20: Score 1805
  // Level 30: Score 4205
  // Level 40: Score 7605
  // Level 50: Score 12005+
  const calculatedLevel = Math.min(50, Math.max(1, Math.floor(Math.sqrt(score / 5) + 1)));

  // Define titles and visual tiers based on level ranges
  let title = 'Sprout';
  let visual_tier = 'green'; // Simple green outfit, no aura

  if (calculatedLevel >= 40) {
    title = 'Legend';
    visual_tier = 'cosmic'; // Golden crown and space suit, rainbow aura
  } else if (calculatedLevel >= 30) {
    title = 'Arch Mage';
    visual_tier = 'crimson'; // Crimson tunic, fire/flame aura
  } else if (calculatedLevel >= 20) {
    title = 'Maintainer';
    visual_tier = 'purple'; // Purple mage robes, gold sparkle aura
  } else if (calculatedLevel >= 10) {
    title = 'Committer';
    visual_tier = 'blue'; // Blue hoodie, blue mist aura
  }

  return {
    score,
    level: calculatedLevel,
    title,
    visual_tier,
  };
}

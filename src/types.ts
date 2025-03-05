export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface UserSkills {
  pythonLevel: SkillLevel;
  deepLearningFrameworks: SkillLevel;
  numpyLevel: SkillLevel;
  mathematicsLevel: SkillLevel;
  statisticsLevel: SkillLevel;
  mlExperience: SkillLevel;
  researchExperience: SkillLevel;
  kaggleExperience: SkillLevel;
}

export interface SquadRecommendation {
  primarySquad: string;
  secondarySquad: string;
  explanation: string;
}
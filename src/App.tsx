import React, { useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { SkillLevelSelect } from './components/SkillLevelSelect';
import { getSquadRecommendations } from './utils/ai';
import type { UserSkills, SkillLevel, SquadRecommendation } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<SquadRecommendation | null>(null);
  const [skills, setSkills] = useState<UserSkills>({
    pythonLevel: 'Beginner',
    deepLearningFrameworks: 'Beginner',
    numpyLevel: 'Beginner',
    mathematicsLevel: 'Beginner',
    statisticsLevel: 'Beginner',
    mlExperience: 'Beginner',
    researchExperience: 'Beginner',
    kaggleExperience: 'Beginner'
  });

  const updateSkill = (key: keyof UserSkills, value: SkillLevel) => {
    setSkills(prev => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await getSquadRecommendations(skills);
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError(error instanceof Error ? error.message : 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-zinc-800/50 mb-4 ring-1 ring-zinc-700">
            <Brain className="h-12 w-12 text-zinc-400" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200">
            Squad Finder
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            Find your perfect AI/ML learning squad
          </p>
        </div>

        <div className="glass-morphism rounded-xl p-6 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <SkillLevelSelect
                label="Python"
                value={skills.pythonLevel}
                onChange={(value) => updateSkill('pythonLevel', value)}
              />
              <SkillLevelSelect
                label="Pytorch/Tensorflow"
                value={skills.deepLearningFrameworks}
                onChange={(value) => updateSkill('deepLearningFrameworks', value)}
              />
              <SkillLevelSelect
                label="NumPy & Pandas"
                value={skills.numpyLevel}
                onChange={(value) => updateSkill('numpyLevel', value)}
              />
              <SkillLevelSelect
                label="Mathematics"
                value={skills.mathematicsLevel}
                onChange={(value) => updateSkill('mathematicsLevel', value)}
              />
              <SkillLevelSelect
                label="Statistics"
                value={skills.statisticsLevel}
                onChange={(value) => updateSkill('statisticsLevel', value)}
              />
              <SkillLevelSelect
                label="ML Experience"
                value={skills.mlExperience}
                onChange={(value) => updateSkill('mlExperience', value)}
              />
              <SkillLevelSelect
                label="Research Experience"
                value={skills.researchExperience}
                onChange={(value) => updateSkill('researchExperience', value)}
              />
              <SkillLevelSelect
                label="Kaggle Experience"
                value={skills.kaggleExperience}
                onChange={(value) => updateSkill('kaggleExperience', value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-zinc-500 disabled:opacity-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] border border-zinc-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </div>
          </form>
        </div>

        {recommendation && (
          <div className="glass-morphism rounded-xl p-6 animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200">
              Your Squad Recommendations by TheVixhal
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 ring-1 ring-zinc-700">
                <h3 className="text-lg font-semibold text-zinc-200">Primary Squad</h3>
                <p className="text-zinc-400 mt-2">{recommendation.primarySquad}</p>
              </div>
              
              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 ring-1 ring-zinc-700">
                <h3 className="text-lg font-semibold text-zinc-200">Secondary Squad</h3>
                <p className="text-zinc-400 mt-2">{recommendation.secondarySquad}</p>
              </div>
              
              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 ring-1 ring-zinc-700">
                <h3 className="text-lg font-semibold text-zinc-200">Why These Squads?</h3>
                <p className="text-zinc-400 mt-2">{recommendation.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
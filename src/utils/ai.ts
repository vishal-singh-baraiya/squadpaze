import Groq from 'groq-sdk';
import { UserSkills, SquadRecommendation } from '../types';

// Initialize Groq client with browser support enabled
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '', // Provide empty string as fallback
  dangerouslyAllowBrowser: true // Enable browser support
});

const SYSTEM_PROMPT = `You are an AI expert system that recommends specialized AI/ML study groups (squads) based on user skills. 

Available squads:
1. AI Beginners - Focus on Python basics and AI/ML foundations
2. Machine Learning Enthusiasts - Implementing ML algorithms and applications
3. Kaggle Warriors - Participating in Kaggle competitions
4. Research & Publications - Academic research and paper writing
5. Generative AI Innovators - Working with LLMs, RAG, and modern AI
6. Deep Learning Experts - Computer vision, NLP, and deep learning

Analyze the user's skills and provide:
1. Primary squad recommendation (most suitable)
2. Secondary squad recommendation (growth opportunity)
3. Brief explanation of recommendations

Keep responses in this format: 1st line Should have primary squad recommendation and second line should have secondary squad recommendation and 3 rd line should have explanation. Dont write things like here is your response, based on user skills etc things please.`;

export async function getSquadRecommendations(skills: UserSkills): Promise<SquadRecommendation> {
  if (!import.meta.env.VITE_GROQ_API_KEY) {
    throw new Error(
      'Groq API key is not configured. Please add your VITE_GROQ_API_KEY to the .env file.'
    );
  }

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify(skills) }
    ],
    model: 'mixtral-8x7b-32768',
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    stream: false
  });

  try {
    const response = JSON.parse(completion.choices[0].message.content);
    return response as SquadRecommendation;
  } catch (e) {
    // Fallback parsing if AI doesn't return valid JSON
    const content = completion.choices[0].message.content;
    const lines = content.split('\n');
    return {
      primarySquad: lines[0].replace('Primary Squad:', '').trim(),
      secondarySquad: lines[1].replace('Secondary Squad:', '').trim(),
      explanation: lines.slice(2).join('\n').trim()
    };
  }
}
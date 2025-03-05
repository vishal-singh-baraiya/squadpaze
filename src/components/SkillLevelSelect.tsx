import React from 'react';
import { SkillLevel } from '../types';

interface Props {
  label: string;
  value: SkillLevel;
  onChange: (value: SkillLevel) => void;
}

const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export function SkillLevelSelect({ label, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SkillLevel)}
        className="w-full p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-200 focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all duration-200 ring-1 ring-zinc-700"
      >
        {levels.map((level) => (
          <option key={level} value={level} className="bg-black">
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}
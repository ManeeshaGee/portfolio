export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  color: string;
}

export const SKILLS: Skill[] = [
  { id: '1', name: 'React', proficiency: 95, color: '#61DAFB' },
  { id: '2', name: 'Node.js', proficiency: 90, color: '#339933' },
  { id: '3', name: 'TypeScript', proficiency: 92, color: '#3178C6' },
  { id: '4', name: 'Next.js', proficiency: 88, color: '#FFFFFF' },
  { id: '5', name: 'Three.js', proficiency: 75, color: '#00FF5F' },
  { id: '6', name: 'Python', proficiency: 85, color: '#3776AB' },
  { id: '7', name: 'Docker', proficiency: 80, color: '#2496ED' },
  { id: '8', name: 'MySQL', proficiency: 82, color: '#4169E1' },
  { id: '9', name: 'Firebase', proficiency: 89, color: '#FFCA28' },
  { id: '10', name: 'Tailwind', proficiency: 94, color: '#06B6D4' },
  { id: '11', name: 'Javascript', proficiency: 82, color: '#4169E1' },
  { id: '12', name: 'Dart', proficiency: 75, color: '#4169E1' },
];

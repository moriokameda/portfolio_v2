'use client';

import { ProjectCard } from './project-card';
import type { Project } from '@/types/project';

// プロジェクトデータ
const projects: Project[] = [
  {
    id: 1,
    title: 'スナックホームページ',
    description: 'HTML、JQuery、Bootstrapを使用したホームページの開発',
    technologies: ['HTML', 'javascript', 'Bootstrap', 'JQuery'],
    imageUrl: 'snack-yu.png',
    liveUrl: 'https://www.yushima-snack-you.com/',
  },
  {
    id: 2,
    title: 'カスタマーサクセス支援Saas',
    description: 'カスタマーサクセスや営業のデジタルセールスルームシステムの開発',
    technologies: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'Docker', 'AWS'],
    imageUrl: 'openpage.png',
    liveUrl: 'https://www.openpage.jp/',
  },
  {
    id: 3,
    title: 'マッスルフォトサービス',
    description:
      'パーソナルトレーニングの経過写真を使い、ユーザーのトレーニングをサポートするサービス',
    technologies: ['React', 'MUI', 'Laravel', 'Docker'],
    imageUrl: 'mascle-photo.png',
    githubUrl: 'https://github.com',
    liveUrl: 'https://muscle-photo.com',
  },
];

export function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

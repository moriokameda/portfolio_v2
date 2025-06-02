'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from './project-card';
import type { Project } from '@/types/project';
import projectsData from '@/data/projects.json';

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // JSONからプロジェクトデータを取得して最初の3つを表示
    setProjects(projectsData.projects.slice(0, 3));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

'use client';

import { ProjectCard } from '@/components/project-card';
import projectsData from '@/data/projects.json';

export default function ProjectsPage() {
  const { projects } = projectsData;

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 bg-background/80 p-6 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4">プロジェクト</h1>
          <p className="text-xl text-foreground">
            これまでに手がけた主なプロジェクトをご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center mt-8 p-8 bg-background/80 rounded-lg backdrop-blur-sm">
            <p className="text-muted-foreground">まだプロジェクトが登録されていません。</p>
          </div>
        )}
      </div>
    </main>
  );
}

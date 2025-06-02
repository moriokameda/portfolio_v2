import type { Project } from './project';

declare module '@/data/projects.json' {
  const value: {
    projects: Project[];
  };
  export default value;
}

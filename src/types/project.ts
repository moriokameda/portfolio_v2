export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string | null;
  liveUrl: string | null;
};

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard with location-based forecasts and interactive charts.',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'Blog Platform',
    description: 'A modern blog platform with markdown support, comments, and admin dashboard.',
    technologies: ['Next.js', 'MDX', 'Prisma', 'NextAuth.js'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description:
      'A responsive portfolio website showcasing projects and skills with modern design.',
    technologies: ['Next.js', 'TypeScript', 'ShadCN UI', 'Tailwind CSS'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 6,
    title: 'Chat Application',
    description: 'Real-time chat application with rooms, file sharing, and emoji support.',
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge 
            and learning experience in my development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-md mb-4" />
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      Live Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

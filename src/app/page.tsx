import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate developer creating amazing digital experiences with modern
            technologies.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">View My Work</Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((project) => (
            <Card key={project} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Project {project}</CardTitle>
                <CardDescription>
                  A brief description of this amazing project and its key features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-4" />
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'React',
            'TypeScript',
            'Next.js',
            'Tailwind CSS',
            'Node.js',
            'Python',
            'PostgreSQL',
            'AWS',
          ].map((skill) => (
            <Card key={skill} className="text-center p-4">
              <CardContent className="p-0">
                <h3 className="font-semibold">{skill}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

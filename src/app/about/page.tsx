import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground">
              Learn more about my journey, skills, and passion for development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>My Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a passionate full-stack developer with a love for creating beautiful,
                  functional, and user-friendly applications. My journey in programming started
                  several years ago, and I&apos;ve been constantly learning and evolving ever since.
                </p>
                <br />
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and staying up-to-date with the
                  latest technologies and best practices in the industry.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What I Do</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Frontend Development with React, Next.js, and TypeScript</li>
                  <li>• Backend Development with Node.js and Python</li>
                  <li>• Database Design and Management</li>
                  <li>• UI/UX Design and Implementation</li>
                  <li>• Cloud Deployment and DevOps</li>
                  <li>• Mobile App Development</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>Technologies and tools I work with regularly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>React / Next.js</li>
                    <li>TypeScript / JavaScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 / CSS3</li>
                    <li>React Hook Form</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Backend</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Node.js / Express</li>
                    <li>Python / Django</li>
                    <li>PostgreSQL / MongoDB</li>
                    <li>REST APIs / GraphQL</li>
                    <li>Authentication & Security</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Tools & Deployment</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Git / GitHub</li>
                    <li>Vercel / Netlify</li>
                    <li>AWS / Google Cloud</li>
                    <li>Docker</li>
                    <li>VS Code</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

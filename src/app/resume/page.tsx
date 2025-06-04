'use client';

import React from 'react';
import resumeData from '@/data/resume.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ResumePage() {
  const { resume } = resumeData;

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="mb-8 flex flex-col items-center gap-4 bg-background/95 p-6 rounded-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center">職務経歴書</h1>
      </div>

      <div className="space-y-8">
        <Card className="bg-background/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{resume.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">{resume.title}</p>
            {resume.summary && (
              <div className="bg-background/80 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">職務要約</h3>
                <p className="text-sm leading-relaxed">{resume.summary}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4 bg-background/95 p-4 rounded-lg backdrop-blur-sm">
            職務経歴
          </h2>
          <div className="space-y-6">
            {resume.workExperience.map((job) => (
              <Card
                key={`job-${job.company}-${job.period}`}
                className="bg-background/95 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{job.company}</CardTitle>
                      <p className="text-lg font-medium text-muted-foreground">{job.position}</p>
                      {job.project && (
                        <p className="text-md font-medium text-blue-600">{job.project}</p>
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm">{job.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm leading-relaxed bg-background/80 p-4 rounded-lg">
                    {job.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">主な業務・プロジェクト</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm bg-background/80 p-4 rounded-lg">
                      {job.projects.map((project) => (
                        <li key={`project-${project.substring(0, 20)}`}>{project}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">使用技術</h4>
                    <div className="flex flex-wrap gap-2 bg-background/80 p-4 rounded-lg">
                      {job.technologies.map((tech) => (
                        <Badge key={`tech-${tech}`} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {resume.sideProjects && resume.sideProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-background/95 p-4 rounded-lg backdrop-blur-sm">
              副業・サイドプロジェクト
            </h2>
            <div className="space-y-4">
              {resume.sideProjects.map((project) => (
                <Card
                  key={`side-${project.project}-${project.period}`}
                  className="bg-background/95 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <CardTitle className="text-lg">{project.project}</CardTitle>
                      <span className="text-muted-foreground text-sm">{project.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm leading-relaxed bg-background/80 p-4 rounded-lg">
                      {project.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">使用技術</h4>
                      <div className="flex flex-wrap gap-2 bg-background/80 p-4 rounded-lg">
                        {project.technologies.map((tech) => (
                          <Badge key={`side-tech-${tech}`} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4 bg-background/95 p-4 rounded-lg backdrop-blur-sm">
            スキル
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.skills.map((skillGroup) => (
              <Card
                key={`skill-${skillGroup.category}`}
                className="bg-background/95 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 bg-background/80 p-4 rounded-lg">
                    {skillGroup.items.map((skill) => (
                      <Badge key={`skill-item-${skill}`} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {resume.strengths && resume.strengths.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-background/95 p-4 rounded-lg backdrop-blur-sm">
              自己PR・強み
            </h2>
            <div className="space-y-4">
              {resume.strengths.map((strength) => (
                <Card
                  key={`strength-${strength.title}`}
                  className="bg-background/95 backdrop-blur-sm"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{strength.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed bg-background/80 p-4 rounded-lg">
                      {strength.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

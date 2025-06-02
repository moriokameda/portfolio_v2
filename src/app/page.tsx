import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { IconType } from 'react-icons';
import Link from 'next/link';
import {
  SiAmazon,
  SiGo,
  SiGraphql,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxtdotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiSpringboot,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { ProjectsSection } from '@/components/projects-section';

// スキルデータの型定義
type SkillData = {
  icon: IconType;
  color: string;
  name: string;
};

// アイコンとスキル名のマッピング（公式カラー付き）
const skillData: SkillData[] = [
  { icon: SiVuedotjs, color: '#4FC08D', name: 'Vue.js' },
  { icon: SiNuxtdotjs, color: '#00DC82', name: 'Nuxt.js' },
  { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
  { icon: SiNextdotjs, color: '#000000', name: 'Next.js' },
  { icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
  { icon: SiPython, color: '#3776AB', name: 'Python' },
  { icon: SiOpenjdk, color: '#007396', name: 'Java' },
  { icon: SiGo, color: '#00ADD8', name: 'Go' },
  { icon: SiPhp, color: '#777BB4', name: 'PHP' },
  { icon: SiLaravel, color: '#FF2D20', name: 'Laravel' },
  { icon: SiKotlin, color: '#7F52FF', name: 'Kotlin' },
  { icon: SiSpringboot, color: '#6DB33F', name: 'Spring Boot' },
  { icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
  { icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
  { icon: SiMysql, color: '#4479A1', name: 'MySQL' },
  { icon: SiAmazon, color: '#FF9900', name: 'AWS' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 bg-background/80 backdrop-blur-sm p-8 rounded-lg inline-block mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Mkameのポートフォリオへようこそ
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            モダンな技術を使用して、素晴らしいデジタル体験を創造するエンジニアです。
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects">作品を見る</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-background/80 backdrop-blur-sm inline-block px-6 py-2 rounded-lg mx-auto">
          主なプロジェクト
        </h2>
        <ProjectsSection />
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-background/80 backdrop-blur-sm inline-block px-6 py-2 rounded-lg mx-auto">
          スキルと技術
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skillData.map((skill) => {
            const IconComponent = skill.icon;

            return (
              <Card
                key={skill.name}
                className="text-center p-4 bg-background/80 backdrop-blur-sm border-background/20 hover:shadow-md transition-all"
              >
                <CardContent className="p-2 flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${skill.color}20` }}>
                    <IconComponent className="text-4xl" style={{ color: skill.color }} />
                  </div>
                  <h3 className="font-semibold">{skill.name}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}

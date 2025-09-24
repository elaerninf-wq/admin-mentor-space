import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Map, 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  ExternalLink,
  Star,
  Trophy,
  Target
} from 'lucide-react';

// Mock roadmap data
const roadmaps = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Master modern frontend technologies and frameworks',
    totalSteps: 12,
    completedSteps: 7,
    difficulty: 'Intermediate',
    estimatedTime: '8 weeks',
    steps: [
      { id: 1, title: 'HTML & CSS Fundamentals', completed: true, resources: 3 },
      { id: 2, title: 'JavaScript Basics', completed: true, resources: 5 },
      { id: 3, title: 'DOM Manipulation', completed: true, resources: 4 },
      { id: 4, title: 'ES6+ Features', completed: true, resources: 3 },
      { id: 5, title: 'React Fundamentals', completed: true, resources: 6 },
      { id: 6, title: 'React Hooks', completed: true, resources: 4 },
      { id: 7, title: 'State Management', completed: true, resources: 5 },
      { id: 8, title: 'React Router', completed: false, resources: 3, current: true },
      { id: 9, title: 'Testing with Jest', completed: false, resources: 4 },
      { id: 10, title: 'Performance Optimization', completed: false, resources: 3 },
      { id: 11, title: 'TypeScript Integration', completed: false, resources: 5 },
      { id: 12, title: 'Deployment & CI/CD', completed: false, resources: 4 }
    ]
  },
  {
    id: 2,
    title: 'Backend Development',
    description: 'Build robust server-side applications and APIs',
    totalSteps: 10,
    completedSteps: 3,
    difficulty: 'Advanced',
    estimatedTime: '10 weeks',
    steps: [
      { id: 1, title: 'Node.js Basics', completed: true, resources: 4 },
      { id: 2, title: 'Express Framework', completed: true, resources: 5 },
      { id: 3, title: 'Database Design', completed: true, resources: 6 },
      { id: 4, title: 'Authentication & Security', completed: false, resources: 7, current: true },
      { id: 5, title: 'RESTful APIs', completed: false, resources: 5 },
      { id: 6, title: 'GraphQL', completed: false, resources: 4 },
      { id: 7, title: 'Testing & Documentation', completed: false, resources: 3 },
      { id: 8, title: 'Caching & Performance', completed: false, resources: 4 },
      { id: 9, title: 'Microservices', completed: false, resources: 6 },
      { id: 10, title: 'DevOps & Deployment', completed: false, resources: 5 }
    ]
  },
  {
    id: 3,
    title: 'Full Stack Integration',
    description: 'Connect frontend and backend into complete applications',
    totalSteps: 8,
    completedSteps: 0,
    difficulty: 'Advanced',
    estimatedTime: '6 weeks',
    steps: [
      { id: 1, title: 'Project Architecture', completed: false, resources: 4, current: true },
      { id: 2, title: 'API Integration', completed: false, resources: 5 },
      { id: 3, title: 'Real-time Features', completed: false, resources: 3 },
      { id: 4, title: 'File Upload & Processing', completed: false, resources: 4 },
      { id: 5, title: 'Payment Integration', completed: false, resources: 5 },
      { id: 6, title: 'Email & Notifications', completed: false, resources: 3 },
      { id: 7, title: 'Performance Monitoring', completed: false, resources: 4 },
      { id: 8, title: 'Production Deployment', completed: false, resources: 6 }
    ]
  }
];

const RoadmapCard: React.FC<{ roadmap: any }> = ({ roadmap }) => {
  const [expanded, setExpanded] = useState(false);
  const progress = Math.round((roadmap.completedSteps / roadmap.totalSteps) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-success';
      case 'intermediate': return 'bg-warning';
      case 'advanced': return 'bg-destructive';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              {roadmap.title}
            </CardTitle>
            <CardDescription className="mt-1">{roadmap.description}</CardDescription>
          </div>
          <Badge variant="outline" className={`${getDifficultyColor(roadmap.difficulty)} text-white`}>
            {roadmap.difficulty}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{roadmap.completedSteps}/{roadmap.totalSteps} steps</span>
          </div>
          <Progress value={progress} className="w-full" />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {roadmap.estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {progress}% complete
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Button 
          variant="outline" 
          onClick={() => setExpanded(!expanded)}
          className="w-full mb-4"
        >
          {expanded ? 'Hide Steps' : 'View Learning Path'}
        </Button>

        {expanded && (
          <div className="space-y-3">
            {roadmap.steps.map((step: any, index: number) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  step.current 
                    ? 'border-primary bg-primary-light' 
                    : step.completed 
                    ? 'border-success bg-success-light' 
                    : 'border-border'
                }`}
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : step.current ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${
                      step.current ? 'text-primary' : 
                      step.completed ? 'text-success' : 'text-foreground'
                    }`}>
                      {index + 1}. {step.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {step.resources} resources
                      </span>
                      {step.current && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="ghost">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const Roadmap: React.FC = () => {
  const totalProgress = roadmaps.reduce((acc, roadmap) => 
    acc + (roadmap.completedSteps / roadmap.totalSteps), 0
  ) / roadmaps.length * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Roadmaps</h1>
        <p className="text-muted-foreground">
          Structured learning paths to guide your development journey
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Overall Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Progress</span>
            <span className="font-semibold">{Math.round(totalProgress)}% Complete</span>
          </div>
          <Progress value={totalProgress} className="w-full mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">
                {roadmaps.reduce((acc, r) => acc + r.completedSteps, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Steps Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {roadmaps.reduce((acc, r) => acc + r.totalSteps, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Steps</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{roadmaps.length}</p>
              <p className="text-sm text-muted-foreground">Active Roadmaps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Cards */}
      <div className="grid gap-6">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-success-light rounded-lg">
              <Trophy className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium text-success">Frontend Fundamentals Master</p>
                <p className="text-sm text-muted-foreground">Completed 7 steps in Frontend Development</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary-light rounded-lg">
              <Star className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-primary">Backend Explorer</p>
                <p className="text-sm text-muted-foreground">Started Backend Development journey</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import heroBg from '@/assets/hero-bg.jpg';

export const RoleSelection: React.FC = () => {
  const { selectRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    selectRole(role);
  };

  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.95), rgba(248, 250, 252, 0.95)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-custom-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Intern Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for managing interns, tracking progress, and facilitating learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="hover-lift cursor-pointer animate-scale-in shadow-custom-lg border-0 bg-card/80 backdrop-blur-sm" onClick={() => handleRoleSelect('admin')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Administrator</CardTitle>
              <CardDescription className="text-base">
                Full access to manage interns, attendance, content, and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4" variant="default" size="lg">
                Continue as Admin
              </Button>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Upload and manage syllabus content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Track attendance for all interns
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Send notifications and updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Manage learning resources and tools
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer animate-scale-in shadow-custom-lg border-0 bg-card/80 backdrop-blur-sm" onClick={() => handleRoleSelect('intern')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-hover rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Intern</CardTitle>
              <CardDescription className="text-base">
                Access your learning materials, track progress, and stay updated with announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4" variant="secondary" size="lg">
                Continue as Intern
              </Button>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  View syllabus and learning resources
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Check personal attendance record
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Follow structured learning roadmaps
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Access development tools and resources
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
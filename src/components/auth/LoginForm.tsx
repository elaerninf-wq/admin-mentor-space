import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Users } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  role: UserRole;
  onBack: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password, role);
      if (success) {
        toast({
          title: "Login successful!",
          description: `Welcome back, ${role}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password. Try 'admin/password' or 'intern/password'",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleConfig = {
    admin: {
      icon: Shield,
      title: 'Administrator Login',
      description: 'Access the admin dashboard to manage the system',
      color: 'primary'
    },
    intern: {
      icon: Users,
      title: 'Intern Login',
      description: 'Access your learning materials and progress',
      color: 'secondary'
    }
  };

  const config = roleConfig[role];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <Button
              variant="ghost"
              className="absolute top-4 left-4 p-2"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className={`w-12 h-12 bg-${config.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 text-${config.color}-foreground`} />
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder={`Enter your ${role} username`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo credentials:</strong><br />
                Username: {role} | Password: password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
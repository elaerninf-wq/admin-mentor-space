import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const notifications = [
  {
    id: 1,
    title: 'New syllabus uploaded for Week 12',
    message: 'Advanced React Patterns and Performance Optimization',
    time: '2 hours ago',
    type: 'info'
  },
  {
    id: 2,
    title: 'Attendance reminder',
    message: 'Please mark your attendance for today',
    time: '1 day ago',
    type: 'warning'
  },
  {
    id: 3,
    title: 'Project deadline approaching',
    message: 'React Portfolio Project due in 3 days',
    time: '2 days ago',
    type: 'urgent'
  }
];

const upcomingDates = [
  {
    id: 1,
    title: 'Mid-term Assessment',
    date: '2024-02-15',
    type: 'exam'
  },
  {
    id: 2,
    title: 'Project Presentation',
    date: '2024-02-20',
    type: 'presentation'
  },
  {
    id: 3,
    title: 'Team Meeting',
    date: '2024-02-12',
    type: 'meeting'
  }
];

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Interns', value: '68', icon: Users, change: '+2 this week' },
    { title: 'Present Today', value: '64', icon: CheckCircle, change: '94% attendance' },
    { title: 'Active Modules', value: '12', icon: BookOpen, change: '3 completed' },
    { title: 'Avg. Performance', value: '87%', icon: TrendingUp, change: '+5% from last month' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage system components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Upload New Syllabus
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Manage Interns
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Sarah Johnson marked present</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">New intern added: Mike Chen</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">Week 11 syllabus uploaded</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const InternDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Stay updated with your learning journey</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Latest Updates
            </CardTitle>
            <CardDescription>Important announcements and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border border-border rounded-lg hover:bg-card-hover transition-colors">
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      notification.type === 'urgent' ? 'text-destructive' : 
                      notification.type === 'warning' ? 'text-warning' : 'text-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    <Badge variant={notification.type === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Important Dates
            </CardTitle>
            <CardDescription>Upcoming deadlines and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDates.map((date) => (
                <div key={date.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{date.title}</h4>
                      <p className="text-sm text-muted-foreground">{new Date(date.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {date.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-success-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Attendance</h3>
            <p className="text-2xl font-bold text-success">92%</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Modules</h3>
            <p className="text-2xl font-bold text-primary">8/12</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-secondary-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground">Performance</h3>
            <p className="text-2xl font-bold text-secondary">A-</p>
            <p className="text-sm text-muted-foreground">Average Grade</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === 'admin' ? <AdminDashboard /> : <InternDashboard />;
};
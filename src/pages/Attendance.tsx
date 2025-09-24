import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  UserCheck,
  UserX,
  Download
} from 'lucide-react';

// Mock intern data
const mockInterns = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', attendance: 92, status: 'active' },
  { id: 2, name: 'Mike Chen', email: 'mike.c@email.com', attendance: 88, status: 'active' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@email.com', attendance: 96, status: 'active' },
  { id: 4, name: 'James Wilson', email: 'james.w@email.com', attendance: 84, status: 'active' },
  { id: 5, name: 'Lisa Park', email: 'lisa.p@email.com', attendance: 91, status: 'active' }
];

// Mock attendance records for current intern
const mockAttendanceHistory = [
  { date: '2024-01-22', status: 'present' },
  { date: '2024-01-21', status: 'present' },
  { date: '2024-01-20', status: 'absent' },
  { date: '2024-01-19', status: 'present' },
  { date: '2024-01-18', status: 'present' }
];

const AdminAttendanceView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState(
    mockInterns.reduce((acc, intern) => ({
      ...acc,
      [intern.id]: Math.random() > 0.2 ? 'present' : 'absent'
    }), {} as Record<number, 'present' | 'absent'>)
  );

  const filteredInterns = mockInterns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceToggle = (internId: number) => {
    setAttendanceData(prev => ({
      ...prev,
      [internId]: prev[internId] === 'present' ? 'absent' : 'present'
    }));
  };

  const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
  const totalCount = mockInterns.length;
  const attendanceRate = Math.round((presentCount / totalCount) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage intern attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interns</p>
                <p className="text-2xl font-bold text-foreground">{totalCount}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold text-success">{presentCount}</p>
              </div>
              <UserCheck className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent Today</p>
                <p className="text-2xl font-bold text-destructive">{totalCount - presentCount}</p>
              </div>
              <UserX className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold text-foreground">{attendanceRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Attendance Marking */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Mark Attendance - {selectedDate?.toLocaleDateString()}
              </CardTitle>
              <CardDescription>
                Click on intern names to mark their attendance for today
              </CardDescription>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search interns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {filteredInterns.map((intern) => (
                <div
                  key={intern.id}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                    attendanceData[intern.id] === 'present'
                      ? 'bg-success-light border-success'
                      : 'bg-muted hover:bg-card-hover'
                  }`}
                  onClick={() => handleAttendanceToggle(intern.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      attendanceData[intern.id] === 'present' ? 'bg-success' : 'bg-muted-foreground'
                    }`}>
                      {attendanceData[intern.id] === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{intern.name}</p>
                      <p className="text-sm text-muted-foreground">{intern.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={attendanceData[intern.id] === 'present' ? 'default' : 'destructive'}>
                      {attendanceData[intern.id]}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{intern.attendance}% avg</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const InternAttendanceView: React.FC = () => {
  const { user } = useAuth();
  const attendanceRate = 92; // Mock attendance rate

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Attendance</h1>
        <p className="text-muted-foreground">Track your attendance record and statistics</p>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-success-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Overall Rate</h3>
            <p className="text-3xl font-bold text-success">{attendanceRate}%</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Days Present</h3>
            <p className="text-3xl font-bold text-primary">18</p>
            <p className="text-sm text-muted-foreground">Out of 20 days</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-warning-light rounded-lg mx-auto mb-4 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Days Absent</h3>
            <p className="text-3xl font-bold text-warning">2</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance record for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAttendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    record.status === 'present' ? 'bg-success-light' : 'bg-destructive/10'
                  }`}>
                    {record.status === 'present' ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </div>
                </div>
                <Badge variant={record.status === 'present' ? 'default' : 'destructive'} className="capitalize">
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Attendance: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminAttendanceView /> : <InternAttendanceView />;
};
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Plus, 
  Download, 
  ExternalLink, 
  Calendar,
  Upload,
  FileText,
  Link
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock syllabus data
const mockSyllabus = [
  {
    id: 1,
    week: 1,
    title: 'Introduction to Programming Fundamentals',
    description: 'Basic programming concepts, variables, and data types',
    resources: [
      { name: 'Lecture Slides', url: '#', type: 'pdf' },
      { name: 'Practice Exercises', url: '#', type: 'link' },
      { name: 'Video Tutorial', url: '#', type: 'video' }
    ],
    status: 'completed',
    uploadDate: '2024-01-08'
  },
  {
    id: 2,
    week: 2,
    title: 'Control Structures and Functions',
    description: 'Loops, conditionals, and function definitions',
    resources: [
      { name: 'Code Examples', url: '#', type: 'code' },
      { name: 'Assignment', url: '#', type: 'pdf' }
    ],
    status: 'current',
    uploadDate: '2024-01-15'
  },
  {
    id: 3,
    week: 3,
    title: 'Object-Oriented Programming',
    description: 'Classes, objects, inheritance, and polymorphism',
    resources: [],
    status: 'upcoming',
    uploadDate: null
  }
];

const AdminSyllabusView: React.FC = () => {
  const [syllabusItems, setSyllabusItems] = useState(mockSyllabus);
  const [newItem, setNewItem] = useState({
    week: '',
    title: '',
    description: '',
    resources: []
  });

  const handleAddSyllabus = () => {
    // Mock implementation
    console.log('Adding syllabus item:', newItem);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Syllabus Management</h1>
          <p className="text-muted-foreground">Upload and manage weekly syllabus content</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Syllabus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Syllabus</DialogTitle>
              <DialogDescription>
                Add a new weekly or monthly syllabus with resources
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Week Number</label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 4"
                    value={newItem.week}
                    onChange={(e) => setNewItem({...newItem, week: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Upcoming</option>
                    <option>Current</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input 
                  placeholder="e.g., Advanced React Patterns"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the learning objectives and topics covered..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Resources</label>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddSyllabus}>Upload Syllabus</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {syllabusItems.map((item) => (
          <Card key={item.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Week {item.week}: {item.title}
                    <Badge variant={
                      item.status === 'completed' ? 'default' :
                      item.status === 'current' ? 'secondary' : 'outline'
                    }>
                      {item.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                {item.uploadDate && (
                  <div className="text-right text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(item.uploadDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Resources ({item.resources.length})</h4>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
                {item.resources.length > 0 ? (
                  <div className="grid gap-2">
                    {item.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{resource.name}</span>
                          <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No resources uploaded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const InternSyllabusView: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Syllabus</h1>
        <p className="text-muted-foreground">Access your weekly learning materials and resources</p>
      </div>

      <div className="grid gap-6">
        {mockSyllabus.map((item) => (
          <Card key={item.id} className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Week {item.week}: {item.title}
                <Badge variant={
                  item.status === 'completed' ? 'default' :
                  item.status === 'current' ? 'secondary' : 'outline'
                }>
                  {item.status}
                </Badge>
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {item.resources.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-medium">Resources</h4>
                  <div className="grid gap-2">
                    {item.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-card-hover transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{resource.name}</span>
                          <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Resources will be available soon</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Syllabus: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminSyllabusView /> : <InternSyllabusView />;
};
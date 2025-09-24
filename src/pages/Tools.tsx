import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Wrench, 
  Code, 
  Globe, 
  Palette, 
  Database, 
  Terminal, 
  FileText, 
  Image,
  Plus,
  ExternalLink,
  Search,
  Download,
  Star,
  Bookmark
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock tools data
const mockTools = [
  {
    id: 1,
    name: 'Visual Studio Code',
    description: 'Powerful source code editor with extensive extension support',
    category: 'Code Editor',
    url: 'https://code.visualstudio.com',
    icon: Code,
    featured: true,
    rating: 4.9,
    tags: ['free', 'cross-platform', 'extensions']
  },
  {
    id: 2,
    name: 'Figma',
    description: 'Collaborative interface design tool for UI/UX designers',
    category: 'Design',
    url: 'https://figma.com',
    icon: Palette,
    featured: true,
    rating: 4.8,
    tags: ['design', 'collaboration', 'prototyping']
  },
  {
    id: 3,
    name: 'MongoDB Compass',
    description: 'GUI for MongoDB database administration and querying',
    category: 'Database',
    url: 'https://mongodb.com/products/compass',
    icon: Database,
    featured: false,
    rating: 4.6,
    tags: ['database', 'mongodb', 'gui']
  },
  {
    id: 4,
    name: 'Postman',
    description: 'API development and testing platform',
    category: 'API Testing',
    url: 'https://postman.com',
    icon: Terminal,
    featured: true,
    rating: 4.7,
    tags: ['api', 'testing', 'development']
  },
  {
    id: 5,
    name: 'React DevTools',
    description: 'Browser extension for debugging React components',
    category: 'Debugging',
    url: 'https://react.dev/learn/react-developer-tools',
    icon: Code,
    featured: false,
    rating: 4.8,
    tags: ['react', 'debugging', 'extension']
  }
];

const categories = ['All', 'Code Editor', 'Design', 'Database', 'API Testing', 'Debugging'];

const AdminToolsView: React.FC = () => {
  const [tools, setTools] = useState(mockTools);
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    category: '',
    url: '',
    tags: ''
  });

  const handleAddTool = () => {
    const tool = {
      id: Date.now(),
      ...newTool,
      icon: Wrench,
      featured: false,
      rating: 4.5,
      tags: newTool.tags.split(',').map(tag => tag.trim())
    };
    setTools([...tools, tool]);
    setNewTool({ name: '', description: '', category: '', url: '', tags: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tools Management</h1>
          <p className="text-muted-foreground">Manage development tools and resources for interns</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tool</DialogTitle>
              <DialogDescription>Add a useful development tool or resource</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Tool Name"
                value={newTool.name}
                onChange={(e) => setNewTool({...newTool, name: e.target.value})}
              />
              <Input
                placeholder="Description"
                value={newTool.description}
                onChange={(e) => setNewTool({...newTool, description: e.target.value})}
              />
              <Input
                placeholder="Category"
                value={newTool.category}
                onChange={(e) => setNewTool({...newTool, category: e.target.value})}
              />
              <Input
                placeholder="URL"
                value={newTool.url}
                onChange={(e) => setNewTool({...newTool, url: e.target.value})}
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newTool.tags}
                onChange={(e) => setNewTool({...newTool, tags: e.target.value})}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddTool}>Add Tool</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Card key={tool.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tool.name}
                        {tool.featured && (
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{tool.category}</Badge>
                    <div className="flex gap-1">
                      {tool.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">★ {tool.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const InternToolsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarked, setBookmarked] = useState<number[]>([1, 2]);

  const filteredTools = mockTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (toolId: number) => {
    setBookmarked(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Development Tools</h1>
        <p className="text-muted-foreground">Essential tools and resources for your development journey</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTools.filter(tool => tool.featured).map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs mt-1">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(tool.id)}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked.includes(tool.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {tool.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Tools */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            All Tools ({filteredTools.length})
          </h2>
        </div>
        
        <div className="grid gap-4">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{tool.name}</h3>
                          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          {tool.featured && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <div className="flex gap-1 mt-2">
                          {tool.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">★ {tool.rating}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(tool.id)}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked.includes(tool.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Tools: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminToolsView /> : <InternToolsView />;
};
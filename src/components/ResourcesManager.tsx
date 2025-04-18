
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Plus, BookOpen, Crosshair, Map, Trophy, FileCode } from "lucide-react";

export interface Resource {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: string;
}

export interface ResourcesManagerProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourcesManager({ resources = [], setResources }: ResourcesManagerProps) {
  const [activeTab, setActiveTab] = useState("beginner");
  const [newResourceTitle, setNewResourceTitle] = useState("");
  const [newResourceContent, setNewResourceContent] = useState("");
  const { toast } = useToast();

  const resourceTypes = [
    { id: "beginner", label: "Beginner's Guide", icon: <BookOpen className="h-4 w-4" /> },
    { id: "character", label: "Character Guides", icon: <FileText className="h-4 w-4" /> },
    { id: "weapon", label: "Weapon Tier List", icon: <Crosshair className="h-4 w-4" /> },
    { id: "map", label: "Map Strategies", icon: <Map className="h-4 w-4" /> },
    { id: "rank", label: "Rank Pushing Tips", icon: <Trophy className="h-4 w-4" /> },
    { id: "patch", label: "Patch Notes", icon: <FileCode className="h-4 w-4" /> }
  ];

  const addResource = () => {
    if (!newResourceTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for the resource.",
        variant: "destructive",
      });
      return;
    }

    if (!newResourceContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please provide content for the resource.",
        variant: "destructive",
      });
      return;
    }

    const newResource = {
      id: `resource-${Date.now()}`,
      title: newResourceTitle,
      type: activeTab,
      content: newResourceContent,
      createdAt: new Date().toISOString(),
    };

    // Add the new resource to the resources array
    setResources([...resources, newResource]);

    // Save to localStorage for persistence
    const existingResources = JSON.parse(localStorage.getItem("booyahzoneResources") || "[]");
    localStorage.setItem("booyahzoneResources", JSON.stringify([...existingResources, newResource]));

    toast({
      title: "Resource Added",
      description: `${newResourceTitle} has been added to ${getResourceTypeLabel(activeTab)}.`,
    });

    // Reset form
    setNewResourceTitle("");
    setNewResourceContent("");
  };

  const removeResource = (id: string) => {
    // Remove the resource from the resources array
    const updatedResources = resources.filter(resource => resource.id !== id);
    setResources(updatedResources);

    // Update localStorage
    localStorage.setItem("booyahzoneResources", JSON.stringify(updatedResources));

    toast({
      title: "Resource Removed",
      description: "The resource has been removed.",
    });
  };

  const getResourceTypeLabel = (type: string): string => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    return resourceType ? resourceType.label : type;
  };

  return (
    <div className="space-y-6">
      <div className="neon-card p-6">
        <h2 className="text-xl font-bold mb-4">Resource Management</h2>
        <p className="text-muted-foreground mb-6">
          Add, edit, or remove resources for the BooyahZone community.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {resourceTypes.map(type => (
              <TabsTrigger 
                key={type.id} 
                value={type.id} 
                className="flex items-center gap-2"
              >
                {type.icon}
                <span className="hidden md:inline">{type.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {resourceTypes.map(type => (
            <TabsContent key={type.id} value={type.id}>
              <div className="space-y-6">
                <div className="bg-card/60 p-4 rounded-lg border border-border">
                  <h3 className="text-lg font-medium mb-4">Add New {type.label}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input 
                        value={newResourceTitle}
                        onChange={(e) => setNewResourceTitle(e.target.value)}
                        placeholder={`Enter ${type.label} title`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea 
                        className="w-full min-h-[200px] p-3 rounded-md border border-border bg-background"
                        value={newResourceContent}
                        onChange={(e) => setNewResourceContent(e.target.value)}
                        placeholder={`Write your ${type.label} content here...`}
                      />
                    </div>
                    <Button 
                      variant="fire" 
                      className="flex items-center gap-2"
                      onClick={addResource}
                    >
                      <Plus className="h-4 w-4" />
                      Add {type.label}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Existing {type.label}</h3>
                  {resources.filter(resource => resource.type === type.id).length > 0 ? (
                    <div className="space-y-4">
                      {resources
                        .filter(resource => resource.type === type.id)
                        .map(resource => (
                          <div key={resource.id} className="p-4 border border-border rounded-lg bg-card/60">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Added on {new Date(resource.createdAt).toLocaleDateString()}
                                </p>
                                <p className="mt-2 line-clamp-3">{resource.content}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeResource(resource.id)}
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No {type.label} resources found. Add some now!</p>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  BookOpen, 
  Users, 
  Crosshair, 
  Map, 
  Trophy, 
  FileText, 
  Plus, 
  Trash,
  Pencil,
  Save 
} from "lucide-react";

export type ResourceType = 
  | "beginner-guide"
  | "character-guide"
  | "weapon-tier"
  | "map-strategy"
  | "rank-tip"
  | "patch-note";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const resourceSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  type: z.enum(["beginner-guide", "character-guide", "weapon-tier", "map-strategy", "rank-tip", "patch-note"], {
    required_error: "Please select a resource type.",
  }),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

interface ResourcesManagerProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourcesManager({ resources, setResources }: ResourcesManagerProps) {
  const [activeTab, setActiveTab] = useState<ResourceType>("beginner-guide");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  const { toast } = useToast();

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      type: "beginner-guide",
    },
  });

  const onSubmit = (values: ResourceFormValues) => {
    if (editingResource) {
      // Update existing resource
      const updatedResources = resources.map(resource => 
        resource.id === editingResource.id 
          ? {
              ...resource,
              ...values,
              updatedAt: new Date().toISOString(),
            }
          : resource
      );
      setResources(updatedResources);
      toast({
        title: "Resource Updated",
        description: `"${values.title}" has been updated.`,
      });
    } else {
      // Add new resource
      const newResource: Resource = {
        id: Date.now().toString(),
        type: values.type,
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setResources([...resources, newResource]);
      toast({
        title: "Resource Added",
        description: `"${values.title}" has been added to ${getResourceTypeLabel(values.type)}.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingResource(null);
    form.reset();
  };

  const handleDelete = (id: string) => {
    const resourceToDelete = resources.find(r => r.id === id);
    if (!resourceToDelete) return;
    
    setResources(resources.filter(resource => resource.id !== id));
    toast({
      title: "Resource Deleted",
      description: `"${resourceToDelete.title}" has been removed.`,
    });
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    form.reset({
      title: resource.title,
      content: resource.content,
      imageUrl: resource.imageUrl || "",
      type: resource.type,
    });
    setIsAddDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingResource(null);
    form.reset({
      title: "",
      content: "",
      imageUrl: "",
      type: activeTab,
    });
    setIsAddDialogOpen(true);
  };

  const filteredResources = resources.filter(resource => resource.type === activeTab);

  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "beginner-guide": return <BookOpen className="h-5 w-5" />;
      case "character-guide": return <Users className="h-5 w-5" />;
      case "weapon-tier": return <Crosshair className="h-5 w-5" />;
      case "map-strategy": return <Map className="h-5 w-5" />;
      case "rank-tip": return <Trophy className="h-5 w-5" />;
      case "patch-note": return <FileText className="h-5 w-5" />;
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch (type) {
      case "beginner-guide": return "Beginner's Guide";
      case "character-guide": return "Character Guides";
      case "weapon-tier": return "Weapon Tier List";
      case "map-strategy": return "Map Strategies";
      case "rank-tip": return "Rank Pushing Tips";
      case "patch-note": return "Patch Notes";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resource Management</h2>
        <Button variant="fire" onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Resource
        </Button>
      </div>
      
      <Tabs defaultValue="beginner-guide" value={activeTab} onValueChange={(value) => setActiveTab(value as ResourceType)}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="beginner-guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Beginner's Guide</span>
          </TabsTrigger>
          <TabsTrigger value="character-guide" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Character Guides</span>
          </TabsTrigger>
          <TabsTrigger value="weapon-tier" className="flex items-center gap-2">
            <Crosshair className="h-4 w-4" />
            <span className="hidden md:inline">Weapon Tier List</span>
          </TabsTrigger>
          <TabsTrigger value="map-strategy" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden md:inline">Map Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="rank-tip" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden md:inline">Rank Tips</span>
          </TabsTrigger>
          <TabsTrigger value="patch-note" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Patch Notes</span>
          </TabsTrigger>
        </TabsList>
        
        {(["beginner-guide", "character-guide", "weapon-tier", "map-strategy", "rank-tip", "patch-note"] as ResourceType[]).map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getResourceTypeIcon(resource.type)}
                          <CardTitle>{resource.title}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(resource)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(resource.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Last updated: {new Date(resource.updatedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {resource.imageUrl && (
                        <div className="aspect-video overflow-hidden rounded-md mb-4">
                          <img 
                            src={resource.imageUrl} 
                            alt={resource.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="line-clamp-3">{resource.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <p>No {getResourceTypeLabel(type)} resources found.</p>
                  <Button variant="outline" className="mt-4" onClick={handleAddNew}>
                    Add your first {getResourceTypeLabel(type).toLowerCase()} resource
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
            <DialogDescription>
              {editingResource 
                ? "Update the resource details below."
                : "Fill in the details to add a new resource."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource Type</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="beginner-guide">Beginner's Guide</option>
                        <option value="character-guide">Character Guide</option>
                        <option value="weapon-tier">Weapon Tier List</option>
                        <option value="map-strategy">Map Strategy</option>
                        <option value="rank-tip">Rank Pushing Tip</option>
                        <option value="patch-note">Patch Note</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter resource title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the resource content" 
                        className="min-h-[200px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" variant="fire" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminAuth } from "@/components/AdminAuth";
import { ResourcesManager, Resource, ResourceType } from "@/components/ResourcesManager";
import { BookOpen, Users, Crosshair, Map, Trophy, FileText, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const SAMPLE_RESOURCES: Resource[] = [
  {
    id: "1",
    type: "beginner",
    title: "Getting Started with Free Fire",
    content: "Free Fire is a battle royale game where 50 players parachute onto an island and fight to be the last one standing. This guide will help you understand the basics of the game, from landing strategies to weapon choices and more.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "character",
    title: "Alok Character Guide",
    content: "Alok is one of the most versatile characters in Free Fire. His 'Drop the Beat' ability creates a 5m aura that increases movement speed by 10% and restores 5 HP/s for 5 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "weapon",
    title: "Season 10 Weapon Tier List",
    content: "In this tier list, we rank all weapons in Free Fire from S-tier to F-tier based on their damage, recoil, fire rate, and overall effectiveness in different situations.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "map",
    title: "Bermuda Hot Spots",
    content: "Bermuda is one of the most popular maps in Free Fire. This guide covers the best landing spots, loot locations, and rotation strategies to help you secure more Booyahs!",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "rank",
    title: "Rank Pushing to Heroic",
    content: "This guide provides strategies and tips for climbing from Diamond to Heroic rank. Learn about optimal drop locations, when to engage in fights, and how to position yourself in the final circles.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    type: "patch",
    title: "May 2025 Update Notes",
    content: "The latest update brings balance changes to several weapons, introduces a new character, and adds a new location to the Bermuda map. Read the full details here.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Guides() {
  const [resources, setResources] = useState<Resource[]>(SAMPLE_RESOURCES);
  const [activeTab, setActiveTab] = useState<ResourceType>("beginner");
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const { category } = useParams();
  
  useEffect(() => {
    if (category) {
      const categoryMap: Record<string, ResourceType> = {
        "characters": "character",
        "weapons": "weapon",
        "maps": "map",
        "rank": "rank",
        "updates": "patch",
      };
      
      if (categoryMap[category]) {
        setActiveTab(categoryMap[category]);
      } else if (category === "beginner") {
        setActiveTab("beginner");
      }
    }
    
    setIsAdmin(sessionStorage.getItem("isAdmin") === "true");
  }, [category]);

  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "beginner": return <BookOpen className="h-5 w-5" />;
      case "character": return <Users className="h-5 w-5" />;
      case "weapon": return <Crosshair className="h-5 w-5" />;
      case "map": return <Map className="h-5 w-5" />;
      case "rank": return <Trophy className="h-5 w-5" />;
      case "patch": return <FileText className="h-5 w-5" />;
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch (type) {
      case "beginner": return "Beginner's Guide";
      case "character": return "Character Guides";
      case "weapon": return "Weapon Tier List";
      case "map": return "Map Strategies";
      case "rank": return "Rank Pushing Tips";
      case "patch": return "Patch Notes";
    }
  };

  const filteredResources = resources.filter(resource => resource.type === activeTab);

  const handleReadMore = (resourceId: string) => {
    // In a real app, this would navigate to a detailed view of the resource
    console.log(`Navigating to resource: ${resourceId}`);
    // For now, we'll just show a notification
    alert(`Viewing resource: ${resourceId}`);
  };

  return (
    <Layout>
      <section className="py-16 min-h-screen">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">BooyahZone Guides</h1>
              <p className="text-muted-foreground">
                Learn strategies, tips, and tricks to master Free Fire and climb the ranks.
              </p>
            </div>
            
            {isAdmin ? (
              <AdminAuth>
                <ResourcesManager 
                  resources={resources}
                  setResources={setResources}
                />
              </AdminAuth>
            ) : (
              <AdminAuth>
                <ResourcesManager 
                  resources={resources}
                  setResources={setResources}
                />
              </AdminAuth>
            )}
          </div>
          
          <Tabs 
            defaultValue="beginner" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as ResourceType)}
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="beginner" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Beginner's Guide</span>
              </TabsTrigger>
              <TabsTrigger value="character" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Character Guides</span>
              </TabsTrigger>
              <TabsTrigger value="weapon" className="flex items-center gap-2">
                <Crosshair className="h-4 w-4" />
                <span className="hidden md:inline">Weapon Tier List</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="hidden md:inline">Map Strategies</span>
              </TabsTrigger>
              <TabsTrigger value="rank" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden md:inline">Rank Tips</span>
              </TabsTrigger>
              <TabsTrigger value="patch" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Patch Notes</span>
              </TabsTrigger>
            </TabsList>
            
            {(["beginner", "character", "weapon", "map", "rank", "patch"] as ResourceType[]).map((type) => (
              <TabsContent key={type} value={type}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  {getResourceTypeIcon(type)}
                  {getResourceTypeLabel(type)}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map(resource => (
                    <Card key={resource.id} className="overflow-hidden">
                      {resource.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={resource.imageUrl} 
                            alt={resource.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>
                          Last updated: {new Date(resource.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 mb-4">{resource.content}</p>
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => handleReadMore(resource.id)}
                        >
                          Read more
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No {getResourceTypeLabel(type).toLowerCase()} available yet.</p>
                    {isAdmin && (
                      <p>Create your first {getResourceTypeLabel(type).toLowerCase()} in the admin panel.</p>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

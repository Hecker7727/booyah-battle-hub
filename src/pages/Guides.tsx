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
    type: "beginner-guide",
    title: "Getting Started with Free Fire",
    content: "Free Fire is a battle royale game where 50 players parachute onto an island and fight to be the last one standing. This guide will help you understand the basics of the game, from landing strategies to weapon choices and more.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "character-guide",
    title: "Alok Character Guide",
    content: "Alok is one of the most versatile characters in Free Fire. His 'Drop the Beat' ability creates a 5m aura that increases movement speed by 10% and restores 5 HP/s for 5 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "weapon-tier",
    title: "Season 10 Weapon Tier List",
    content: "In this tier list, we rank all weapons in Free Fire from S-tier to F-tier based on their damage, recoil, fire rate, and overall effectiveness in different situations.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "map-strategy",
    title: "Bermuda Hot Spots",
    content: "Bermuda is one of the most popular maps in Free Fire. This guide covers the best landing spots, loot locations, and rotation strategies to help you secure more Booyahs!",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "rank-tip",
    title: "Rank Pushing to Heroic",
    content: "This guide provides strategies and tips for climbing from Diamond to Heroic rank. Learn about optimal drop locations, when to engage in fights, and how to position yourself in the final circles.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    type: "patch-note",
    title: "May 2025 Update Notes",
    content: "The latest update brings balance changes to several weapons, introduces a new character, and adds a new location to the Bermuda map. Read the full details here.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Guides() {
  const [resources, setResources] = useState<Resource[]>(SAMPLE_RESOURCES);
  const [activeTab, setActiveTab] = useState<ResourceType>("beginner-guide");
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const { category } = useParams();
  
  useEffect(() => {
    if (category) {
      const categoryMap: Record<string, ResourceType> = {
        "characters": "character-guide",
        "weapons": "weapon-tier",
        "maps": "map-strategy",
        "rank": "rank-tip",
        "updates": "patch-note",
      };
      
      if (categoryMap[category]) {
        setActiveTab(categoryMap[category]);
      } else if (category === "beginner") {
        setActiveTab("beginner-guide");
      }
    }
    
    setIsAdmin(sessionStorage.getItem("isAdmin") === "true");
  }, [category]);

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

  const filteredResources = resources.filter(resource => resource.type === activeTab);

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
                <ResourcesManager />
              </AdminAuth>
            ) : (
              <AdminAuth>
                <ResourcesManager />
              </AdminAuth>
            )}
          </div>
          
          <Tabs 
            defaultValue="beginner-guide" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as ResourceType)}
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
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
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
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

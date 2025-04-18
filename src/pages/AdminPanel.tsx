
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "@/components/AdminAuth";
import { ResourcesManager, Resource } from "@/components/ResourcesManager";
import { ModeratorManagement } from "@/components/ModeratorManagement";
import { Shield, Book, Users, Settings, BarChart } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("resources");
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  
  // Check if user is admin (would use a real auth check in a production app)
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  
  useEffect(() => {
    // Load resources from localStorage
    const storedResources = localStorage.getItem("booyahzoneResources");
    if (storedResources) {
      setResources(JSON.parse(storedResources));
    }
  }, []);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-16 min-h-[80vh] flex flex-col items-center justify-center">
          <AdminAuth>
            <div className="text-center max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
              <p className="text-muted-foreground mb-4">
                Log in with your admin credentials to access the admin dashboard and manage the BooyahZone community.
              </p>
            </div>
          </AdminAuth>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 min-h-screen">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Shield className="h-6 w-6 text-booyah-fire" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage content, users, and settings for the BooyahZone platform.
              </p>
            </div>
            
            <AdminAuth>
              {/* This is just for the logout button */}
              <div></div>
            </AdminAuth>
          </div>
          
          <Tabs 
            defaultValue="resources" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Team</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Stats</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <ResourcesManager resources={resources} setResources={setResources} />
            </TabsContent>
            
            <TabsContent value="team">
              <ModeratorManagement />
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="neon-card p-6">
                <h2 className="text-xl font-bold mb-4">Platform Statistics</h2>
                <p className="text-muted-foreground">
                  This section displays user analytics, engagement metrics, and other platform statistics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-card/60 p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-medium mb-2">Users</h3>
                    <p className="text-3xl font-bold text-booyah-neon-blue">10,482</p>
                    <p className="text-sm text-green-500">+12% this month</p>
                  </div>
                  <div className="bg-card/60 p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-medium mb-2">Tournaments</h3>
                    <p className="text-3xl font-bold text-booyah-fire">26</p>
                    <p className="text-sm text-green-500">+4 this month</p>
                  </div>
                  <div className="bg-card/60 p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-medium mb-2">Squad Requests</h3>
                    <p className="text-3xl font-bold text-booyah-neon-pink">142</p>
                    <p className="text-sm text-green-500">+28% this month</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="neon-card p-6">
                <h2 className="text-xl font-bold mb-4">Site Settings</h2>
                <p className="text-muted-foreground mb-6">
                  Configure global settings for the BooyahZone platform.
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">User Registration</h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>Allow new registrations</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>Email verification required</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Content Moderation</h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>Auto-moderate comments</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>Approve clips before publishing</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Tournament Settings</h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span>Allow user-created tournaments</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Require approval for tournaments</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

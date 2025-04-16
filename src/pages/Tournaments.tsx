
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { TournamentsSection } from "@/components/TournamentsSection";
import { AdminAuth } from "@/components/AdminAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateTournamentForm } from "@/components/CreateTournamentForm";
import { Plus } from "lucide-react";

export default function Tournaments() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Check if user is admin
    setIsAdmin(sessionStorage.getItem("isAdmin") === "true");
  }, []);

  const handleCreateTournamentSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      {isAdmin && (
        <>
          <div className="container py-6">
            <div className="flex justify-end">
              <AdminAuth>
                <Button 
                  variant="fire" 
                  className="flex items-center gap-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Create Tournament
                </Button>
              </AdminAuth>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Tournament</DialogTitle>
              </DialogHeader>
              <CreateTournamentForm onSuccess={handleCreateTournamentSuccess} />
            </DialogContent>
          </Dialog>
        </>
      )}
      
      <TournamentsSection />
    </Layout>
  );
}

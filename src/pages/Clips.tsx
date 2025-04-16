
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipUploadForm } from "@/components/ClipUploadForm";
import { Plus } from "lucide-react";
import { ClipsSection } from "@/components/ClipsSection";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Clips() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to upload clips.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleUploadSuccess = () => {
    setIsDialogOpen(false);
    toast({
      title: "Clip Uploaded",
      description: "Your clip has been successfully uploaded and will be reviewed by moderators.",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex justify-end">
          <Button 
            variant="fire" 
            className="flex items-center gap-2"
            onClick={handleUploadClick}
          >
            <Plus className="h-4 w-4" />
            Upload Your Clip
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload a New Clip</DialogTitle>
          </DialogHeader>
          <ClipUploadForm onSuccess={handleUploadSuccess} />
        </DialogContent>
      </Dialog>
      
      <ClipsSection />
    </Layout>
  );
}

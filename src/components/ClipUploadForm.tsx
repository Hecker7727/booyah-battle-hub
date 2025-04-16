
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload, Link, X, Tag } from "lucide-react";

const clipSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
  videoUrl: z.string().url({ message: "Please enter a valid URL." }).refine(
    (url) => {
      // Check for common video hosting platforms
      return url.includes("youtube.com") || 
             url.includes("youtu.be") || 
             url.includes("twitch.tv") || 
             url.includes("facebook.com") || 
             url.includes("vimeo.com");
    }, 
    { message: "URL must be from YouTube, Twitch, Facebook, or Vimeo." }
  ),
  tags: z.string().optional(),
  gameMode: z.string().min(1, { message: "Please select a game mode." }),
});

type ClipFormValues = z.infer<typeof clipSchema>;

export function ClipUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ClipFormValues>({
    resolver: zodResolver(clipSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      tags: "",
      gameMode: "battle-royale",
    },
  });

  const onSubmit = async (values: ClipFormValues) => {
    // First check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to upload clips.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Submitting clip:", values);
      
      toast({
        title: "Clip Uploaded Successfully!",
        description: "Your clip has been uploaded and will be reviewed by moderators.",
      });
      
      form.reset();
      setIsSubmitting(false);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <div className="neon-card p-6">
      <h3 className="text-xl font-bold mb-4">Upload Your Clip</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clip Title</FormLabel>
                <FormControl>
                  <Input placeholder="My best Booyah moment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your amazing gameplay..." 
                    className="resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gameMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Mode</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="battle-royale">Battle Royale</option>
                    <option value="clash-squad">Clash Squad</option>
                    <option value="lone-wolf">Lone Wolf</option>
                    <option value="custom-room">Custom Room</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <div className="flex-1 relative">
                      <Input 
                        placeholder="https://youtube.com/..." 
                        {...field} 
                        className="pl-10"
                      />
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  {field.value && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => form.setValue("videoUrl", "")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste a link from YouTube, Twitch, Facebook, or Vimeo
                </p>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (Optional)</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="squad, headshot, booyah, ranked (comma separated)" 
                      {...field}
                      className="pl-10" 
                    />
                  </FormControl>
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              variant="fire"
              disabled={isSubmitting}
              className="w-full flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isSubmitting ? "Uploading..." : "Upload Clip"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Users, User, Trophy, Mail, Phone } from "lucide-react";

const tournamentRegistrationSchema = z.object({
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters." }),
  captainName: z.string().min(2, { message: "Captain name must be at least 2 characters." }),
  captainID: z.string().min(6, { message: "Free Fire ID must be at least 6 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  teamMembers: z.string().min(1, { message: "Please enter your team members." }),
  experience: z.string().optional(),
});

export function TournamentRegistrationForm({ 
  tournamentId, 
  tournamentName, 
  onSuccess 
}: { 
  tournamentId: string; 
  tournamentName: string;
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof tournamentRegistrationSchema>>({
    resolver: zodResolver(tournamentRegistrationSchema),
    defaultValues: {
      teamName: "",
      captainName: "",
      captainID: "",
      email: "",
      phone: "",
      teamMembers: "",
      experience: "",
    },
  });

  const onSubmit = (values: z.infer<typeof tournamentRegistrationSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting tournament registration:", values, "Tournament ID:", tournamentId);
      
      toast({
        title: "Registration Successful!",
        description: `Your team has been registered for ${tournamentName}. Check your email for confirmation.`,
      });
      
      form.reset();
      setIsSubmitting(false);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Enter your team name" {...field} className="pl-10" />
                </FormControl>
                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="captainName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Captain Name</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Your in-game name" {...field} className="pl-10" />
                  </FormControl>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="captainID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Free Fire ID</FormLabel>
                <FormControl>
                  <Input placeholder="Your Free Fire ID" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  Example: 123456789
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} className="pl-10" />
                  </FormControl>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} className="pl-10" />
                  </FormControl>
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="teamMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Members</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea 
                    placeholder="List your team members' names and IDs, one per line" 
                    className="resize-none min-h-[100px] pl-10"
                    {...field} 
                  />
                </FormControl>
                <Users className="absolute left-3 top-6 h-4 w-4 text-muted-foreground" />
              </div>
              <FormDescription>
                Format: Name (ID), one per line. Example:<br />
                Player1 (123456789)<br />
                Player2 (987654321)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Experience (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List any previous tournaments you've participated in" 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          variant="fire" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </Button>
      </form>
    </Form>
  );
}

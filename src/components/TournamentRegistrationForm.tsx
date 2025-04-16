
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
import { Users, User, Trophy, Mail, Phone, Gamepad } from "lucide-react";

const tournamentRegistrationSchema = z.object({
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters." }),
  captainName: z.string().min(2, { message: "Captain name must be at least 2 characters." }),
  captainID: z.string().min(6, { message: "Free Fire ID must be at least 6 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  teamSize: z.string().min(1, { message: "Please select team size." }),
  teamMembers: z.string().min(1, { message: "Please enter your team members." }),
  experience: z.string().optional(),
  region: z.string().min(1, { message: "Please select your region." }),
  device: z.string().min(1, { message: "Please select your device." }),
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
      teamSize: "squad",
      teamMembers: "",
      experience: "",
      region: "",
      device: "",
    },
  });
  
  const teamSize = form.watch("teamSize");

  const onSubmit = (values: z.infer<typeof tournamentRegistrationSchema>) => {
    // First check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to register for tournaments.",
        variant: "destructive",
      });
      return;
    }
    
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

  const getMemberRequirement = () => {
    switch (teamSize) {
      case "squad": return "List 3 other team members (4 total including captain)";
      case "duo": return "List 1 other team member (2 total including captain)";
      case "solo": return "Solo registration (no additional members needed)";
      default: return "List your team members";
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                    <SelectItem value="squad">Squad (4 players)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="NA">North America</SelectItem>
                    <SelectItem value="SA">South America</SelectItem>
                    <SelectItem value="SEA">Southeast Asia</SelectItem>
                    <SelectItem value="MENA">Middle East</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="device"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device</FormLabel>
                <div className="relative">
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="emulator">Emulator</SelectItem>
                    </SelectContent>
                  </Select>
                  <Gamepad className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {teamSize !== "solo" && (
          <FormField
            control={form.control}
            name="teamMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Members</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea 
                      placeholder={`${getMemberRequirement()}, one per line`}
                      className="resize-none min-h-[100px] pl-10"
                      {...field} 
                    />
                  </FormControl>
                  <Users className="absolute left-3 top-6 h-4 w-4 text-muted-foreground" />
                </div>
                <FormDescription>
                  Format: Name (ID), one per line. Example:<br />
                  Player1 (123456789)<br />
                  {teamSize === "squad" && (
                    <>
                      Player2 (987654321)<br />
                      Player3 (456789123)
                    </>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
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

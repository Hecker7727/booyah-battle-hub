
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
import { Calendar, Clock, MapPin, Trophy, Users, Gamepad } from "lucide-react";

const tournamentSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please enter a time." }),
  location: z.string().min(1, { message: "Please select a region." }),
  prize: z.string().min(1, { message: "Please enter prize details." }),
  maxTeams: z.coerce.number().int().min(2, { message: "At least 2 teams required." }),
  game: z.string().min(1, { message: "Please select a game mode." }),
  type: z.string().min(1, { message: "Please select a tournament type." }),
  rules: z.string().min(20, { message: "Rules must be at least 20 characters." }),
});

export function CreateTournamentForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      prize: "",
      maxTeams: 16,
      game: "Battle Royale",
      type: "Squad",
      rules: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tournamentSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Creating tournament:", values);
      
      toast({
        title: "Tournament Created!",
        description: "Your tournament has been created and is now visible to players.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter tournament title" {...field} />
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
                  placeholder="Describe your tournament..." 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      type="date" 
                      placeholder="Select date" 
                      {...field} 
                      className="pl-10"
                    />
                  </FormControl>
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="e.g. 18:00 - 22:00" 
                      {...field} 
                      className="pl-10"
                    />
                  </FormControl>
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="Asia">Asia</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="South America">South America</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="prize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prize</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder="e.g. $1,000" 
                      {...field} 
                      className="pl-10"
                    />
                  </FormControl>
                  <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="maxTeams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Teams</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type="number" 
                    min={2}
                    {...field} 
                    className="pl-10"
                  />
                </FormControl>
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="game"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Mode</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select game mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                        <SelectItem value="Clash Squad">Clash Squad</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <Gamepad className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Type</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tournament type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solo">Solo</SelectItem>
                      <SelectItem value="Duo">Duo</SelectItem>
                      <SelectItem value="Squad">Squad</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Rules</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter the rules and format for your tournament..." 
                  className="resize-none min-h-[150px]"
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
          {isSubmitting ? "Creating Tournament..." : "Create Tournament"}
        </Button>
      </form>
    </Form>
  );
}

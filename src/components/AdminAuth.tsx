
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Lock, Shield } from "lucide-react";

// In a real app, these would be stored securely in a database
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "booyah123",
};

const adminAuthSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type AdminAuthValues = z.infer<typeof adminAuthSchema>;

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if admin is already authenticated in sessionStorage
    return sessionStorage.getItem("isAdmin") === "true";
  });
  
  const { toast } = useToast();
  
  const form = useForm<AdminAuthValues>({
    resolver: zodResolver(adminAuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: AdminAuthValues) => {
    if (
      values.username === ADMIN_CREDENTIALS.username && 
      values.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAdmin(true);
      sessionStorage.setItem("isAdmin", "true");
      toast({
        title: "Admin Access Granted",
        description: "You now have admin privileges.",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("isAdmin");
    toast({
      title: "Logged Out",
      description: "Admin session ended.",
    });
  };

  return (
    <>
      {isAdmin ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-booyah-neon-blue">
              <Shield className="h-5 w-5" />
              <span className="font-bold">Admin Mode</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Exit Admin Mode
            </Button>
          </div>
          {children}
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="neon" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin Login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Authentication</DialogTitle>
              <DialogDescription>
                Enter your admin credentials to access admin features.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter admin username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter admin password" 
                            {...field} 
                            className="pl-10"
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" variant="fire">Authenticate</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

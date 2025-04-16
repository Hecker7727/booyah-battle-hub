
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Shield, User, UserPlus, Trash, Edit, Mail } from "lucide-react";

type UserRole = "admin" | "moderator" | "editor" | "user";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
}

// Sample team members
const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@booyahzone.com",
    role: "admin",
    joined: "2025-03-01",
  },
  {
    id: "2",
    name: "Forum Mod",
    email: "forums@booyahzone.com",
    role: "moderator",
    joined: "2025-03-10",
  },
  {
    id: "3",
    name: "Content Creator",
    email: "content@booyahzone.com",
    role: "editor",
    joined: "2025-04-01",
  },
];

const memberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["admin", "moderator", "editor", "user"], {
    required_error: "Please select a role.",
  }),
});

type MemberFormValues = z.infer<typeof memberSchema>;

export function ModeratorManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const { toast } = useToast();

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const onSubmit = (values: MemberFormValues) => {
    if (editingMember) {
      // Update existing member
      const updatedMembers = teamMembers.map(member => 
        member.id === editingMember.id 
          ? {
              ...member,
              name: values.name,
              email: values.email,
              role: values.role,
            }
          : member
      );
      setTeamMembers(updatedMembers);
      toast({
        title: "Team Member Updated",
        description: `${values.name}'s information has been updated.`,
      });
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        role: values.role,
        joined: new Date().toISOString().split('T')[0],
      };
      setTeamMembers([...teamMembers, newMember]);
      toast({
        title: "Team Member Added",
        description: `${values.name} has been added as a ${values.role}.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingMember(null);
    form.reset();
  };

  const handleDelete = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    if (!memberToDelete) return;
    
    // Prevent deleting the last admin
    if (memberToDelete.role === "admin" && teamMembers.filter(m => m.role === "admin").length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "You must keep at least one admin account.",
        variant: "destructive",
      });
      return;
    }
    
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team Member Removed",
      description: `${memberToDelete.name} has been removed from the team.`,
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    form.reset({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setIsAddDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingMember(null);
    form.reset({
      name: "",
      email: "",
      role: "user",
    });
    setIsAddDialogOpen(true);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin": return "bg-red-500 text-white";
      case "moderator": return "bg-blue-500 text-white";
      case "editor": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button variant="fire" onClick={handleAddNew} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map(member => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  {member.role === "admin" ? (
                    <Shield className="h-5 w-5 text-booyah-fire" />
                  ) : member.role === "moderator" ? (
                    <Shield className="h-5 w-5 text-booyah-neon-blue" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}
                  {member.name}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(member.id)}
                    disabled={member.role === "admin" && teamMembers.filter(m => m.role === "admin").length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Joined: {member.joined}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>
              {editingMember 
                ? "Update the team member's information below."
                : "Add a new team member with appropriate permissions."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="user">Regular User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {field.value === "admin" 
                        ? "Full access to all features and settings" 
                        : field.value === "moderator"
                        ? "Can moderate content and users"
                        : field.value === "editor"
                        ? "Can create and edit content"
                        : "Standard user privileges"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" variant="fire">
                  {editingMember ? "Update" : "Add Member"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

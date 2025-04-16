
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    // This would normally call an API
    console.log("Login form submitted:", values);
    
    // Simulate login success
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    
    navigate("/");
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    // This would normally call an API
    console.log("Register form submitted:", values);
    
    // Simulate registration success
    toast({
      title: "Account created!",
      description: "Your account has been successfully created. Welcome to BooyahZone!",
    });
    
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Layout>
      <section className="py-16 relative min-h-[80vh] flex items-center">
        {/* Background effects */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
              radial-gradient(circle at 70% 50%, rgba(234, 56, 76, 0.1) 0%, rgba(0, 0, 0, 0) 50%)
            `
          }}
        ></div>
        
        <div className="container relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {mode === "login" ? "Welcome Back!" : "Join BooyahZone"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "login" 
                  ? "Sign in to your account to continue your gaming journey" 
                  : "Create an account to join our growing community of gamers"}
              </p>
            </div>
            
            <div className="neon-card p-6">
              {mode === "login" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="yourname@example.com" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter your password" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="absolute right-0 top-0 h-full px-3" 
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <FormMessage />
                          <div className="text-right mt-1">
                            <a href="#" className="text-xs text-booyah-neon-blue hover:underline">
                              Forgot Password?
                            </a>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" variant="fire" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="yourname@example.com" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Create a password" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="absolute right-0 top-0 h-full px-3" 
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm your password" 
                                {...field} 
                                className="pl-10"
                              />
                            </FormControl>
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="absolute right-0 top-0 h-full px-3" 
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" variant="fire" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <Button 
                    variant="link" 
                    className="text-booyah-neon-blue p-0 h-auto mx-1"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </Button>
                </p>
              </div>
              
              <div className="relative flex items-center justify-center mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-card text-xs uppercase text-muted-foreground">
                  Or continue with
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook logo" className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to BooyahZone's 
                <a href="#" className="text-booyah-neon-blue hover:underline mx-1">Terms of Service</a>
                and
                <a href="#" className="text-booyah-neon-blue hover:underline mx-1">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

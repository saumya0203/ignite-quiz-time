import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending OTP
    toast({
      title: "Success",
      description: "OTP sent to your email!",
    });
    
    navigate("/otp-verification", { state: { email } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome!</h1>
          <p className="text-muted-foreground">Enter your email to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-lg rounded-xl border-2"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
          >
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
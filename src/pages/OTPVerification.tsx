import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, accept any 6-digit OTP
    toast({
      title: "Success",
      description: "Email verified successfully!",
    });
    
    navigate("/avatar-selection");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Email</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to
          </p>
          <p className="text-muted-foreground font-medium">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="h-14 text-lg text-center rounded-xl border-2 tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-semibold rounded-xl bg-orange hover:bg-orange/90 text-orange-foreground"
          >
            Verify OTP
          </Button>

          <div className="text-center">
            <button 
              type="button"
              className="text-orange font-medium"
              onClick={() => {
                toast({
                  title: "OTP Resent",
                  description: "New OTP sent to your email!",
                });
              }}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
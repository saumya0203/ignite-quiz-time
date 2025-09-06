import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Leaderboard } from "@/components/Leaderboard";
import { Profile } from "@/components/Profile";
import { Sun, Users, Trophy, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [quizCode, setQuizCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinQuiz = () => {
    if (!quizCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a quiz code",
        variant: "destructive",
      });
      return;
    }
    
    // For demo, accept "QUIZ123" as valid code
    if (quizCode.trim().toUpperCase() === "QUIZ123") {
      navigate("/quiz", { state: { quizCode: quizCode.trim() } });
    } else {
      toast({
        title: "Invalid Code",
        description: "Quiz code not found. Try QUIZ123 for demo.",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        return <Profile />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Sun className="w-6 h-6 text-yellow" />
                  <span className="text-orange font-medium">GOOD MORNING</span>
                </div>
                <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-8">Madelyn Dias</h1>

              {/* Join Quiz Card */}
              <Card className="bg-pink mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-pink-foreground font-medium">JOIN A QUIZ</span>
                  </div>
                  <h2 className="text-xl font-bold text-pink-foreground mb-4"># Enter Code</h2>
                  <Input
                    placeholder="e.g. abc231"
                    value={quizCode}
                    onChange={(e) => setQuizCode(e.target.value)}
                    className="h-12 mb-4 bg-white border-0 rounded-lg"
                  />
                  <Button 
                    onClick={handleJoinQuiz}
                    className="w-full h-12 bg-white text-pink font-semibold rounded-lg hover:bg-white/90"
                  >
                    Join Quiz
                  </Button>
                </CardContent>
              </Card>

              {/* Featured Card */}
              <Card className="bg-orange">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-orange-foreground" />
                    <span className="text-orange-foreground font-medium">FEATURED</span>
                  </div>
                  <h3 className="text-lg font-bold text-orange-foreground mb-4">
                    Take part in challenges with friends or other players
                  </h3>
                  <Button 
                    variant="outline" 
                    className="bg-white text-orange border-0 hover:bg-white/90"
                  >
                    Find Friends
                  </Button>
                  
                  {/* Avatar decorations */}
                  <div className="flex justify-end mt-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-orange"></div>
                      <div className="w-8 h-8 bg-purple rounded-full border-2 border-orange"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Home;
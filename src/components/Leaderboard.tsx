import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award } from "lucide-react";

export const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { 
      id: 1, 
      name: "Davis Curtis", 
      score: 2569, 
      avatar: "👨‍💻", 
      country: "🇺🇸",
      position: 1,
      medal: "🥇"
    },
    { 
      id: 2, 
      name: "Alena Donin", 
      score: 1469, 
      avatar: "👩‍🎓", 
      country: "🇫🇷",
      position: 2,
      medal: "🥈"
    },
    { 
      id: 3, 
      name: "Craig Gouse", 
      score: 1053, 
      avatar: "👨‍🚀", 
      country: "🇨🇦",
      position: 3,
      medal: "🥉"
    },
    { 
      id: 4, 
      name: "Madelyn Dias", 
      score: 590, 
      avatar: "👤", 
      country: "🇮🇳",
      position: 4,
      medal: ""
    },
    { 
      id: 5, 
      name: "Zain Vaccaro", 
      score: 448, 
      avatar: "👨‍🎨", 
      country: "🇮🇹",
      position: 5,
      medal: ""
    },
  ];

  const [activeFilter, setActiveFilter] = useState("weekly");

  return (
    <div className="min-h-screen bg-green flex flex-col p-6 pb-24">
      <div className="flex items-center justify-between mb-6 text-white">
        <div></div>
        <h1 className="text-xl font-bold">Leaderboard</h1>
        <div></div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-6">
        <div className="bg-green-700 rounded-full p-1">
          <Button
            onClick={() => setActiveFilter("weekly")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeFilter === "weekly"
                ? "bg-green-600 text-white"
                : "bg-transparent text-green-200 hover:bg-green-600"
            }`}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setActiveFilter("alltime")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeFilter === "alltime"
                ? "bg-green-600 text-white"
                : "bg-transparent text-green-200 hover:bg-green-600"
            }`}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.map((player) => (
          <Card key={player.id} className={player.position <= 3 ? "bg-white" : "bg-white/90"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8">
                  <span className="text-xl font-bold text-foreground">{player.position}</span>
                </div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center text-xl">
                    {player.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-xs">
                    {player.country}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-foreground">{player.name}</div>
                  <div className="text-muted-foreground text-sm">{player.score} points</div>
                </div>
                
                <div className="text-2xl">
                  {player.medal}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
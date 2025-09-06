import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Star, Globe, Settings } from "lucide-react";

export const Profile = () => {
  // Mock profile data
  const profileData = {
    name: "Madelyn Dias",
    avatar: "👤",
    country: "🇮🇳",
    stats: {
      points: 590,
      worldRank: "#1,438",
      localRank: "#56"
    }
  };

  const badges = [
    { id: 1, icon: "🎯", color: "bg-green", name: "Accuracy Master" },
    { id: 2, icon: "📊", color: "bg-yellow", name: "Stats Guru" },
    { id: 3, icon: "😊", color: "bg-blue", name: "Happy Player" },
    { id: 4, icon: "🎵", color: "bg-pink", name: "Music Lover" },
    { id: 5, icon: "✨", color: "bg-purple", name: "Star Player" },
    { id: 6, icon: "🔒", color: "bg-gray-600", name: "Mystery Badge" },
  ];

  const tabs = ["Badge", "Stats", "Details"];

  return (
    <div className="min-h-screen bg-orange flex flex-col p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-white">
        <div></div>
        <div></div>
        <Settings className="w-6 h-6" />
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-purple rounded-full flex items-center justify-center text-3xl mx-auto">
              {profileData.avatar}
            </div>
            <div className="absolute -bottom-1 -right-4 text-2xl">
              {profileData.country}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">{profileData.name}</h2>
          
          {/* Stats Row */}
          <div className="bg-orange rounded-xl p-4 mb-4">
            <div className="flex justify-between text-center">
              <div>
                <Star className="w-6 h-6 text-orange-foreground mx-auto mb-1" />
                <div className="text-orange-foreground font-bold text-lg">{profileData.stats.points}</div>
                <div className="text-orange-foreground text-xs">POINTS</div>
              </div>
              <div>
                <Globe className="w-6 h-6 text-orange-foreground mx-auto mb-1" />
                <div className="text-orange-foreground font-bold text-lg">{profileData.stats.worldRank}</div>
                <div className="text-orange-foreground text-xs">WORLD RANK</div>
              </div>
              <div>
                <Settings className="w-6 h-6 text-orange-foreground mx-auto mb-1" />
                <div className="text-orange-foreground font-bold text-lg">{profileData.stats.localRank}</div>
                <div className="text-orange-foreground text-xs">LOCAL RANK</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`text-sm font-medium pb-2 ${
                  index === 0
                    ? "text-purple border-b-2 border-purple"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`${badge.color} rounded-2xl w-16 h-16 flex items-center justify-center text-2xl mx-auto`}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
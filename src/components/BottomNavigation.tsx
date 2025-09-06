import { Home, Trophy, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex items-center justify-center px-6 py-4">
        <div className="flex bg-surface rounded-full p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  isActive
                    ? tab.id === "leaderboard"
                      ? "bg-green text-green-foreground"
                      : tab.id === "profile"
                      ? "bg-orange text-orange-foreground"
                      : "bg-blue text-blue-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && <span className="font-medium">{tab.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};